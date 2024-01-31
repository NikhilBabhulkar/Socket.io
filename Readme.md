## post requests

### Create Group
http://localhost:5001/api/chats/group - for creating the group

-- 
{
  "name":"My Group",
  "users":"[\"65b88524952ce1d168ed9282\" ,\"65b88c54fb22611523d7da0b\"]"
}
--
### Rename group
http://localhost:5001/api/chats/rename  - for renaming the group

-- 
{
  "chatid":"65b9da4b350cdc4b3c1202b6",
  "chatName":"Nikhil's Groups"
}
--

### Group remove
http://localhost:5001/api/chats/groupremove  - for renaming the group


### Add new user to group
http://localhost:5001/api/chats/addtogroup  - for renaming the group

