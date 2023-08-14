import React, { FC, useContext } from 'react';
import '../css/signed.css'
import { Layout, Spin  } from 'antd';
import { Redirect, Route, Switch } from 'react-router-dom';
import Status from '../components/status';
import { LoadingContext } from '../context/LoadingContext';

const { Content } = Layout;


export const SingedRouter: FC = () => {

    const { loading } = useContext(LoadingContext);

    const props = {
        spinning: loading,
        tip: "Espere por favor..."
    }

    return (
        <Spin {...props}>
            <Layout>
                <Content>
                    <Switch>
                        <Route exact strict path="/status" component={ Status } />
                        <Redirect to="/status" />
                    </Switch>
                </Content>
            </Layout>
        </Spin>
    )
    
    
};