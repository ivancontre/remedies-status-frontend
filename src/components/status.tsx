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

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { startUpdateStatus } from "../store/status/action";
import { LoadingContext } from "../context/LoadingContext";
import { startLogout } from "../store/auth/action";

const Status: FC = () => {

    const { showLoading, hideLoading } = useContext(LoadingContext);
    const { status } = useSelector((state: RootState) => state.status); 

    const dispatch = useDispatch();

    const handleSwitch = (checked: boolean, id: string, morning: string) => {
        dispatch(startUpdateStatus(id, morning, checked === true ? 'OPEN' : 'CLOSED', showLoading, hideLoading));
    };
    
    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <>
            <Button style={{ float: 'right', marginTop: 16}} type="primary" danger shape="circle" icon={<LogoutOutlined />} size="small" onClick={ handleLogout }/>

            <Divider orientation="center">Semana</Divider>
            


            <Card style={{ marginTop: 16, marginLeft: 16, marginRight: 0 }}>
            {
                status?.map((s, index) => (
                    
                    <Row style={{ padding: 10, backgroundColor: index%2 === 0 ? '#ebebeb' : ''}} key={s.id} justify="center" >
                        <Col span={6}>
                            {s.day}
                        </Col>
                        <Col span={5} offset={1}>
                            <Switch key={s.id+s.morning} onChange={ (e) => handleSwitch(e, s.id, 'morning') } checkedChildren="AM" unCheckedChildren="AM" checked={s.morning === 'OPEN' ? true : false}/>
                            <Tag style={{ marginTop: 8}} color="green">{moment(s.updatedat_morning).format('DD/MM HH:mm')}</Tag>
                        </Col>
                        <Col span={5} offset={2}>
                            <Switch key={s.id+s.afternoon} onChange={ (e) => handleSwitch(e, s.id, 'afternoon') } checkedChildren="PM" unCheckedChildren="PM" checked={s.afternoon === 'OPEN' ? true : false}/>
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