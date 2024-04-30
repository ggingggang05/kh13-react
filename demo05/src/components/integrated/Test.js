//import
import axios from "axios";
import {useEffect } from "react";

//function

function Test(){

    useEffect(() => {
        axios.get("https://petstore.swagger.io/v2/pet/findByStatus?status=available")
          .then(response => {
            const data = response.data;
            if(data.length === 0) {
              console.log("검색 결과가 존재하지 않습니다");
            } else {
              console.log("조회된 개수: " + data.length); 
              for(let i = 0; i < data.length; i++) {
                console.log("<Pet information>");
                console.log("ID = " + data[i].id);
                console.log("Name = " + data[i].name);
                console.log("Photo count = " + data[i].photoUrls.length);
                console.log("Tag count = " + data[i].tags.length);
                console.log("Status = " + data[i].status);
              }
            }
          })
          .catch(error => {
            console.log("서버와의 통신이 원활하지 않습니다");
          });
    }, []);

    return (
        <>
            
        </>
    );
}

//export
export default Test;