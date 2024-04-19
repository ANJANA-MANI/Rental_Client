import axios from 'axios'
export const commonAPI=async(httprequest,url,reqbody,reqheader)=>{
 const reqConfig={
       method:httprequest,
       url,
       data:reqbody,
       headers:reqheader?reqheader:{"Content-Type":"application/json"}
 }
 //console.log('config',reqConfig);
return await axios(reqConfig).then((result)=>{
  //console.log('axios result',result);
return result;
 }).catch((err)=>
 {
  console.log('axios error',err);
return err;
  })
}