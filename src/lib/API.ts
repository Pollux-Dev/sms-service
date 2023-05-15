import axios from 'axios';

export const getUrl = (message: string, phone: string) =>
  `http://localhost:13014/cgi-bin/sendsms?user=Egress@sms&password=Egress@123&to=${phone}&from=8567&text=${message}&coding=2&charset=utf-8`;

export default axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
