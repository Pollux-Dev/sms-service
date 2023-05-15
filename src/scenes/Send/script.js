import xlsx from 'node-xlsx';
import http from 'http';

const obj = xlsx.parse(`./numbers.xlsx`);

const message =
  'እሁድ መጋቢት 24/2015 ዓ.ም ከቀኑ 7፡30 ጀምሮ በጠቅላይ ቤተ ክህነት አዳራሽ በሚካሄደው ወርሐዊ ጉባኤ መርሐ ግብር ላይ እንዲሳተፉ በአክብሮት ተጋብዘዋል፡፡ ማኅበረ ቅዱሳን';
console.log(message);

let array = [];

for (let i = 0; i < obj[0].data.length; i++) {
  if (obj[0].data[i][0] != null) {
    array.push(obj[0].data[i][0]);
  } else {
    break;
  }
}

var counter = 0;

for (let i = 0; i < array.length; i++) {
  let url = `http://localhost:13014/cgi-bin/sendsms?user=Egress@sms&password=Egress@123&to=${array[i]}&from=8567&text=${message}&coding=2&charset=utf-8`;
  http.get(url, (res) => {
    counter += 1;
    if (counter == array.length) {
      console.log('Message Sent successfuly');
    }
  });
}
