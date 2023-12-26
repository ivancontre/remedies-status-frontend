import { FC, useContext } from "react";
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
//import useSocketCustom from 'react-use-websocket';


import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { LoadingContext } from "../context/LoadingContext";
import { startLogout } from "../store/auth/action";
import { startUpdateStatusV2 } from "../store/statusv2/action";

const Status: FC = () => {

    const { showLoading, hideLoading } = useContext(LoadingContext);
    const { statusV2 } = useSelector((state: RootState) => state.statusV2); 
    //const token = localStorage.getItem('token') || '';

    /*const { sendMessage, readyState } = useSocketCustom('wss://remedies-status-backend-9767cddcb0a5.herokuapp.com', {
        shouldReconnect: (closeEvent) => true,
        queryParams: {
            'x-token': token
        }
      });*/

    const dispatch = useDispatch();

    /*const handleSwitch = (checked: boolean, id: string, day: string, field: string) => {
        let status = checked === true ? 'OPEN' : 'CLOSED';
        let str = '?esp32Id=64d69a90fa92da258cf155be&day='+day+'&field='+field+'&status='+status;       
        sendMessage(str);
        dispatch(startUpdateStatus(id, field, status, showLoading, hideLoading));
    };*/

    const handleSwitchV2 = (checked: boolean, id: string, field: string) => {
        dispatch(startUpdateStatusV2(id, field, checked, showLoading, hideLoading));
    };
    
    const handleLogout = () => {
        dispatch(startLogout());
    }

    /*useEffect(() => {
        console.log(readyState === 1 ? 'open' : 'close')

    }, [readyState]);*/

    return (
        <>
            <Button style={{ float: 'right', marginTop: 16, marginRight: 16}} type="primary" danger shape="circle" icon={<LogoutOutlined />} size="small" onClick={ handleLogout }/>

            <Divider orientation="center">Semana 1</Divider>           


            <Card style={{ marginTop: 16, marginLeft: 16, marginRight: 16 }}>
            {
                statusV2?.map((s, index) => (
                    
                    <Row style={{ padding: 10, backgroundColor: index%2 === 0 ? '#ebebeb' : ''}} key={s.id} justify="center" >
                        <Col span={6}>
                            {s.day}
                        </Col>
                        <Col span={5} offset={1}>
                            <Switch key={index} onChange={ (e) => handleSwitchV2(e, s.id, 'enabledAM') } checkedChildren="AM" unCheckedChildren="AM" checked={s.enabledAM}/>
                            <Tag style={{ marginTop: 8}} color="green">{moment(s.updatedAtAM).format('DD/MM HH:mm')}</Tag>
                        </Col>
                        <Col span={5} offset={2}>
                            <Switch key={index} onChange={ (e) => handleSwitchV2(e, s.id, 'enabledPM') } checkedChildren="PM" unCheckedChildren="PM" checked={s.enabledPM}/>
                            <Tag style={{ marginTop: 8}} color="green">{moment(s.updatedAtPM).format('DD/MM HH:mm')}</Tag>
                        </Col>
                    </Row>
                ))
            }
            </Card>            
        </>
    )
};

export default Status;