import React from "react";

class Error extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('Error: ', error);
        console.log('Error Info: ', errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <h2>There has been some error in the file.</h2>
                </>
            )
        }
        return this.props.children;

    }
}

export default Error;