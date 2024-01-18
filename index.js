let room = 0
// console.log("hello Chats");

let curruntUser =`https://cdn-icons-png.flaticon.com/512/6596/6596121.png`
let otheruser = `https://cdn-icons-png.flaticon.com/512/3607/3607444.png`



const getAllChats = ()=>{

    if(room ===0){
        return
    }

    console.log("room",room);
    const template = ({roomId,msg})=>`
     <div class="${roomId==room?`current-user`:`other-user`}">
    <img src="${roomId==room?curruntUser:otheruser}" alt="">
        <p>${msg}</p>
</div>
    `

   
    const AllItem = JSON.parse(localStorage.getItem("chats")) || [];
    let html = ''
    AllItem.forEach(element => {
       html+= template({roomId:element.user,msg:element.msg})
}); 

document.getElementById("chats_data").innerHTML = html
scroll_Chat()


}


document.getElementById("RoomForm").addEventListener("submit",(e)=>{
    e.preventDefault()

    const data = new FormData(e.target);

    //
    const roomID = data.get("roomId");
    // console.log("rromId",roomID);

    if(isNaN(roomID) || roomID<1){
        alert("Enter Valid RoomID")
        return

    }


    room = Number(roomID)
    e.target.reset()
document.getElementById("RoomForm").classList.add("d-none")
document.getElementById("chat-data").classList.remove("d-none")
document.getElementById("roomid").innerHTML =roomID
getAllChats()


})

document.getElementById("logoutBtn").addEventListener("click",()=>{
    document.getElementById("RoomForm").classList.remove("d-none")
document.getElementById("chat-data").classList.add("d-none")
room = 0
document.getElementById("roomid").innerHTML =room
})

document.getElementById("chat-form").addEventListener("submit",(e)=>{
    e.preventDefault();

    const data = new FormData(e.target);

    const message = data.get("msg");
    if(!message){
        return
    }
    const chat ={
        timestamp:new Date().getTime(),
        msg:message,
        user:room
    }

    
    const AllChats = JSON.parse(localStorage.getItem("chats")) ||[]

        localStorage.setItem("chats",JSON.stringify([...AllChats,chat]))

        getAllChats()
        scroll_Chat()

    e.target.reset();
})

const scroll_Chat = ()=>{
    const container = document.getElementById("chats_data");
    console.log({ scrollTop:container.scrollTop,scrollHeight:container.scrollHeight});

    container.scrollTop = container.scrollHeight
    console.log({ scrollTop:container.scrollTop,scrollHeight:container.scrollHeight});
}

getAllChats()
scroll_Chat()


document.getElementById("resetChats").addEventListener("click",(e)=>{
    localStorage.setItem("chats",JSON.stringify([]))

getAllChats()

})


window.addEventListener("storage",(e)=>{

if(e.key ==='chats' || e.newValue === 'chats'){
getAllChats()
}

})
