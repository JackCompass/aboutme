import { useEffect, useRef } from "react";
import { PERCHES, VIEW_BOX } from "./treeShape";

export const BIRD_COUNT = 5;

const BIRD_WIDTH = 24;
const BIRD_HEIGHT = 18;

// Flight physics. Speeds are in pixels per second, forces in pixels per
// second squared.
const MAX_SPEED = 260; // top speed
const MAX_FORCE = 520; // how hard a bird can turn or brake
const WANDER_FORCE = 180; // how strongly it drifts off a straight line
const PATIENCE = 10000; // ms of flight after which the drift has faded away
const SLOW_RADIUS = 150; // starts braking this close to its branch

const random = (min, max) => min + Math.random() * (max - min);

const pickOne = list => list[Math.floor(Math.random() * list.length)];

// Shorten a vector (x, y) so it is no longer than max.
const limit = (x, y, max) => {
  const length = Math.hypot(x, y);
  return length > max
    ? { x: (x / length) * max, y: (y / length) * max }
    : { x, y };
};

const useFlair = () => {
  const treeRef = useRef(null);
  const birdRefs = useRef([]);

  useEffect(() => {
    const tree = treeRef.current;
    // The CSS hides the whole thing on small screens.
    if (!tree || tree.getClientRects().length === 0) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Turn a perch from tree units into a point on the screen.
    const perchPoint = (index, treeRect) => {
      const scale = treeRect.width / VIEW_BOX.width;
      return {
        x: treeRect.left + (PERCHES[index].x - VIEW_BOX.x) * scale,
        y: treeRect.top + (PERCHES[index].y - VIEW_BOX.y) * scale,
      };
    };

    const offScreenPoint = () => ({
      x: Math.random() < 0.5 ? -50 : window.innerWidth + 50,
      y: random(0, window.innerHeight * 0.5),
    });

    // A bird is "away" (off screen), "flying" or "sitting" on a perch.
    const now = performance.now();
    const birds = birdRefs.current.map(el => ({
      el,
      ...offScreenPoint(),
      vx: 0, // velocity
      vy: 0,
      wander: random(0, Math.PI * 2), // direction of the random drift
      state: "away",
      perch: null,
      facingLeft: false,
      nextMoveAt: now + random(500, 4000),
      nextLookAt: Infinity,
    }));

    // With reduced motion, birds just sit still on the tree.
    if (reduceMotion) {
      birds.forEach((bird, index) => {
        bird.state = "sitting";
        bird.perch = index;
        bird.nextMoveAt = Infinity;
      });
    }

    // A random perch no other bird is on or flying to, or undefined if all
    // of them are taken.
    const freePerch = () => {
      const taken = birds.map(bird => bird.perch);
      const free = PERCHES.map((_, index) => index).filter(
        index => !taken.includes(index),
      );
      return pickOne(free);
    };

    // Take off towards a perch, or off screen when perch is null.
    const flyTo = (bird, perch, treeRect, time) => {
      if (bird.state === "away") {
        // Enter the screen flying, not from a standstill.
        bird.vx = bird.x < 0 ? MAX_SPEED * 0.6 : -MAX_SPEED * 0.6;
      } else {
        // A little jump into the air when leaving a branch.
        bird.vx = random(-60, 60);
        bird.vy = -random(80, 140);
      }

      bird.state = "flying";
      bird.flightStart = time;
      bird.perch = perch;
      bird.exit = perch === null ? offScreenPoint() : null;
      bird.approach = null;

      // Birds don't drop straight onto a branch. They first swoop to a point
      // beside it and a little above, on the side they are coming from, then
      // glide in from there.
      if (perch !== null) {
        const branch = perchPoint(perch, treeRect);
        const side = bird.x < branch.x ? -1 : 1;
        bird.approach = { x: side * random(70, 140), y: -random(30, 70) };
      }
    };

    const land = (bird, time) => {
      bird.state = "sitting";
      bird.vx = 0;
      bird.vy = 0;
      bird.nextMoveAt = time + random(3000, 9000);
      bird.nextLookAt = time + random(1000, 3000);
    };

    // Each frame the bird steers towards where it wants to go, plus a random
    // drift, and can only change its velocity so fast. That's what makes the
    // path curve and wobble like a real bird's instead of a fixed line.
    const updateFlying = (bird, treeRect, time, dt) => {
      let target = bird.exit;
      if (bird.perch !== null) {
        const branch = perchPoint(bird.perch, treeRect);
        target = bird.approach
          ? { x: branch.x + bird.approach.x, y: branch.y + bird.approach.y }
          : branch;
      }
      const dx = target.x - bird.x;
      const dy = target.y - bird.y;
      const distance = Math.hypot(dx, dy) || 1;

      // Close enough to the swoop point: now head for the branch itself.
      if (bird.approach && distance < 50) {
        bird.approach = null;
      }

      // Full speed when far away, slowing down when coming in to land. Birds
      // brake harder while landing so they don't overshoot the branch.
      const landing =
        bird.perch !== null && !bird.approach && distance < SLOW_RADIUS;
      const speed = landing ? (MAX_SPEED * distance) / SLOW_RADIUS : MAX_SPEED;
      const steer = limit(
        (dx / distance) * speed - bird.vx,
        (dy / distance) * speed - bird.vy,
        landing ? MAX_FORCE * 3 : MAX_FORCE,
      );

      // The drift direction changes a little every frame, at random. It fades
      // out on the way in and is gone by the time the bird starts landing.
      // It also fades the longer the bird has been flying, so a bird that
      // wandered far always makes it back to its branch.
      bird.wander += random(-12, 12) * dt;
      const nearness =
        bird.perch === null
          ? 1
          : Math.min(1, Math.max(0, distance / SLOW_RADIUS - 1));
      const patience = Math.max(0, 1 - (time - bird.flightStart) / PATIENCE);
      const drift = WANDER_FORCE * nearness * patience;
      steer.x += Math.cos(bird.wander) * drift;
      steer.y += Math.sin(bird.wander) * drift;

      // Pull up when getting close to the bottom of the screen.
      if (bird.y > window.innerHeight - 60) {
        steer.y -= MAX_FORCE;
      }

      const velocity = limit(
        bird.vx + steer.x * dt,
        bird.vy + steer.y * dt,
        MAX_SPEED,
      );
      bird.vx = velocity.x;
      bird.vy = velocity.y;
      bird.x += bird.vx * dt;
      bird.y += bird.vy * dt;

      // Only turn around when clearly moving sideways, to avoid flickering.
      if (Math.abs(bird.vx) > 15) {
        bird.facingLeft = bird.vx < 0;
      }

      const offScreen =
        bird.x < -40 || bird.x > window.innerWidth + 40 || bird.y < -40;
      const slow = Math.hypot(bird.vx, bird.vy) < 40;

      if (bird.perch === null && offScreen) {
        bird.state = "away";
        bird.vx = 0;
        bird.vy = 0;
        bird.nextMoveAt = time + random(2000, 6000);
      } else if (landing && (distance < 3 || (distance < 12 && slow))) {
        land(bird, time);
      }
    };

    const update = (bird, treeRect, time, dt) => {
      if (bird.state === "flying") {
        updateFlying(bird, treeRect, time, dt);
        return;
      }

      if (bird.state === "sitting") {
        // Stay on the branch even if the window is resized.
        Object.assign(bird, perchPoint(bird.perch, treeRect));

        // Look around now and then.
        if (time > bird.nextLookAt) {
          bird.facingLeft = !bird.facingLeft;
          bird.nextLookAt = time + random(1500, 4000);
        }
      }

      if (time < bird.nextMoveAt) {
        return;
      }

      const leave = bird.state === "sitting" && Math.random() < 0.25;
      const perch = leave ? null : freePerch();

      if (perch === undefined) {
        // Every branch is taken: wait a bit and try again.
        bird.nextMoveAt = time + random(1000, 3000);
      } else {
        flyTo(bird, perch, treeRect, time);
      }
    };

    // The bird's feet are at the bottom center of its box.
    // In flight the body tilts with the direction it is moving (nose down
    // when diving), and the wings stop flapping while gliding downwards.
    const draw = bird => {
      const x = bird.x - BIRD_WIDTH / 2;
      const y = bird.y - BIRD_HEIGHT;
      const flip = bird.facingLeft ? -1 : 1;
      const flying = bird.state === "flying";
      const tilt = flying
        ? Math.max(
            -30,
            Math.min(
              30,
              (Math.atan2(bird.vy, Math.abs(bird.vx)) * 180) / Math.PI,
            ),
          )
        : 0;

      bird.el.style.transform = `translate(${x}px, ${y}px) scaleX(${flip}) rotate(${tilt}deg)`;
      bird.el.dataset.state = flying && bird.vy > 60 ? "gliding" : bird.state;
    };

    let frame;
    let lastTime = performance.now();
    const tick = time => {
      // Seconds since the last frame. Capped so that coming back to a hidden
      // tab doesn't make the birds jump.
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const treeRect = tree.getBoundingClientRect();
      birds.forEach(bird => {
        update(bird, treeRect, time, dt);
        draw(bird);
      });
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return { treeRef, birdRefs };
};

export default useFlair;
