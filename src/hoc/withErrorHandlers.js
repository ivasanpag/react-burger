import React, { Component } from 'react';
import MuiAlert from "@material-ui/lab/Alert";
import Expire from '../components/Util/Expire';


const WithErrorHandlers = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {error: false}
            // axios.interceptors.request.use(request => {
            //     this.state = 
            //         { error: false };
            //     return request;
            // }, error => {
            //     this.state = 
            //         { error: true };
            //     console.log('WithErrorHandler request')

            //     return Promise.reject(error);
            // });


            // axios.interceptors.response.use(response => {
            //     this.state = 
            //         { error: false };
            //     return response;
            // }, error => {
            //     this.state = 
            //         { error: true};
            //     console.log('WithErrorHandler response')
            //     return Promise.reject(error);
            // });

        }

        componentDidMount() {

            axios.interceptors.request.use(request => {
                this.setState({ error: false });

                return request;
            }, error => {
                this.setState({ error: true });
                console.log('WithErrorHandler request')

                return Promise.reject(error);
            });


            axios.interceptors.response.use(response => {
                this.setState({ error: false });
                return response;
            }, error => {
                this.setState({ error: true });

                console.log('WithErrorHandler response')
                return Promise.reject(error);
            });
            
        }

        render() {
            const showError = this.state.error ? (
                <div style={{
                    width: '50%',
                    textAlign: 'center',
                    margin: 'auto',

                }}>
                    <Expire delay="2000">
                        <MuiAlert variant="filled" severity="error">Something went wrong!!</MuiAlert>
                    </Expire>
                </div>

            ) : null;
                console.log(this.state.error)
            return (
                <React.Fragment>
                    {showError}
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }


    }
}

export default WithErrorHandlers;