/*VIDEOSDK_API_KEY="3ae7db3c-ca4c-42a7-925b-4e9f35dab4e2"
VIDEOSDK_SECRET_KEY="6ee622f2a00fb7e940e4eb493e74d8277fed589f432f1a4668e156299e5d27fe"
VIDEOSDK_API_ENDPOINT="https://api.videosdk.live"
const LOCAL_URL='http://localhost:5000'
export const Token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI3OWNiZGE2Zi0wZDc2LTRmZjItOGE2MS0xOGVjNjA2OGNmMzUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY2MjMwODUxMSwiZXhwIjoxNjYyOTEzMzExfQ.84PYsMi4TPfNMSlsvw_PGLqZTj8QNN8E0U7wr1ABjRw'



const VIDEOSDK_API_KEY=process.env.VIDEOSDK_API_KEY;
const VIDEOSDK_SECRET_KEY=process.env.VIDEOSDK_SECRET_KEY;

export const getToken=async()=>{
    try{
    const response= await fetch(`${LOCAL_URL}/get-token`,{
        method:"GET",
    }); 
    const {token}=await response.json();
    console.log(token);
    return token;
}catch(e)
{
    console.log(e);
}

}
export const createMeeting=async({token})=>{

    const options = {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
      };

const {meetingID}=await fetch(`${LOCAL_URL}/api/meetings`,options)
.then((response)=>response.json())
.catch((error)=>console.log('error',error));
return meetingID;
};

export const validateMeeting = async ({ meetingId, token }) => {
    const url = `${LOCAL_URL}/api/meetings/${meetingId}`;
  
    const options = {
      method: "POST",
      headers: { Authorization: token },
    };
  
    const result = await fetch(url, options)
      .then((response) => response.json()) //result will have meeting id
      .catch((error) => console.error("error", error));
  
    return result ? result.meetingId === meetingId : false;
  };*/