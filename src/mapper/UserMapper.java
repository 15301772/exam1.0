package mapper;

import pojo.User;

import java.util.HashMap;
import java.util.List;


public interface
UserMapper {

    public User login(User user);
    public int loginDateTime(HashMap hashMap);
    public List<User> getUserList(HashMap hashMap);

}
