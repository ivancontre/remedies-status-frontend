import { FC, useContext, useEffect } from "react";
import moment from 'moment';
import {
    Switch,
    Divider,
    Row,
    Col,
    Card,
    Tag,
    Button
} from 'antd';

import { LogoutOutlined } from '@ant-design/icons';
import useSocketCustom from 'react-use-websocket';


import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { startUpdateStatus } from "../store/status/action";
import { LoadingContext } from "../context/LoadingContext";
import { startLogout } from "../store/auth/action";

const Status: FC = () => {

    const { showLoading, hideLoading } = useContext(LoadingContext);
    const { status } = useSelector((state: RootState) => state.status); 
    const token = localStorage.getItem('token') || '';

    const { sendMessage, readyState } = useSocketCustom('wss://remedies-status-backend-9767cddcb0a5.herokuapp.com', {
        shouldReconnect: (closeEvent) => true,
        queryParams: {
            'x-token': token
        }
      });

    const dispatch = useDispatch();

    const handleSwitch = (checked: boolean, id: string, day: string, field: string) => {
        let status = checked === true ? 'OPEN' : 'CLOSED';
        let str = '?esp32Id=64d69a90fa92da258cf155be&day='+day+'&field='+field+'&status='+status;       
        sendMessage(str);
        dispatch(startUpdateStatus(id, field, status, showLoading, hideLoading));
    };
    
    const handleLogout = () => {
        dispatch(startLogout());
    }

    useEffect(() => {
        console.log(readyState === 1 ? 'open' : 'close')

    }, [readyState]);

    return (
        <>
            <Button style={{ float: 'right', marginTop: 16, marginRight: 16}} type="primary" danger shape="circle" icon={<LogoutOutlined />} size="small" onClick={ handleLogout }/>

            <Divider orientation="center">Semana</Divider>           


            <Card style={{ marginTop: 16, marginLeft: 16, marginRight: 16 }}>
            {
                status?.map((s, index) => (
                    
                    <Row style={{ padding: 10, backgroundColor: index%2 === 0 ? '#ebebeb' : ''}} key={s.id} justify="center" >
                        <Col span={6}>
                            {s.day}
                        </Col>
                        <Col span={5} offset={1}>
                            <Switch key={s.id+s.morning} onChange={ (e) => handleSwitch(e, s.id, s.day, 'morning') } checkedChildren="AM" unCheckedChildren="AM" checked={s.morning === 'OPEN' ? true : false}/>
                            <Tag style={{ marginTop: 8}} color="green">{moment(s.updatedat_morning).format('DD/MM HH:mm')}</Tag>
                        </Col>
                        <Col span={5} offset={2}>
                            <Switch key={s.id+s.afternoon} onChange={ (e) => handleSwitch(e, s.id, s.day, 'afternoon') } checkedChildren="PM" unCheckedChildren="PM" checked={s.afternoon === 'OPEN' ? true : false}/>
                            <Tag style={{ marginTop: 8}} color="green">{moment(s.updatedat_afternoon).format('DD/MM HH:mm')}</Tag>
                        </Col>
                    </Row>
                ))
            }
            </Card>
            
        </>
    )
};

export default Status;