// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


contract ChatApp{
    struct user{
        string name;
        friend[] friendList;
    }

    struct friend{
        address pubkey;
        string name;
    }

    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUsers{
        string name;
        address accountAddress;
    }

   //creat an array for all users
   AllUsers[] getAllUsers;

    mapping(address=>user) userList;
    mapping (bytes32=>message[]) allMessage;

      event LogName(string name);
    //chech user exist
    function checkUserExists(address pubkey) public view returns(bool){
        return bytes(userList[pubkey].name).length>0;
    }

    function createAccount(string calldata name) external {
         emit LogName(name);

        require(checkUserExists(msg.sender)==false,"user already exist");
        require(bytes(name).length>0,"User name can not be empty");
        
        userList[msg.sender].name=name;  

        getAllUsers.push(AllUsers(name,msg.sender));
    }
     
    function getUsername(address pubkey)external view returns(string memory){
        require(checkUserExists(pubkey),"User not registered");
        return userList[pubkey].name;
    }

    function addFriend(address friend_key,string calldata name) external{
        require(checkUserExists(msg.sender),"Create an Account");
        require(checkUserExists(friend_key),"user is not register");
        require(msg.sender!=friend_key,"User can not add themselves as friend");
        require(checkAlreadyFriends(msg.sender,friend_key)==false,"These users are already friend");
         _addFriend(msg.sender,friend_key,name);
         _addFriend(friend_key,msg.sender,userList[msg.sender].name);
    }

    function checkAlreadyFriends(address pubkey1,address pubkey2) internal view returns(bool){
        if(userList[pubkey1].friendList.length>userList[pubkey2].friendList.length){
            address tmp=pubkey1;
            pubkey1=pubkey2;
            pubkey2=tmp;
        }

        for(uint256 i=0;i<userList[pubkey1].friendList.length;i++){
            if(userList[pubkey1].friendList[i].pubkey==pubkey2) return true; 

        }
        return false;
    }

    function _addFriend(address me,address friend_key,string memory name) internal {
        friend memory newFriend=friend(friend_key,name);
        userList[me].friendList.push(newFriend);

    }
     
     function getMyFriendList() external view returns(friend[] memory){
        return userList[msg.sender].friendList;
     }

     function _getChatCode(address pubkey1,address pubkey2) internal pure returns(bytes32){
                  if(pubkey1<pubkey2){
                    return keccak256(abi.encodePacked(pubkey1,pubkey2));
                  }else{
                    return keccak256(abi.encodePacked(pubkey2,pubkey1));
                  }
     }

     function sendMessage(address friend_key,string calldata _msg) external {
        require(checkUserExists(msg.sender),"Create an account");
        require(checkUserExists(friend_key),"user is not registered");
        require(checkAlreadyFriends(msg.sender, friend_key),"You are not friend with the given user ");
        bytes32 chatCode=_getChatCode(msg.sender, friend_key);
        message memory newMsg=message(msg.sender,block.timestamp,_msg);
        allMessage[chatCode].push(newMsg);
     }


    function readMessage(address friend_key) external view returns(message[] memory){
        bytes32 chatCode=_getChatCode(msg.sender, friend_key);
        return allMessage[chatCode];
    }

    function getAllAppUser() public view returns (AllUsers[] memory) {
      return getAllUsers;
    }

}
