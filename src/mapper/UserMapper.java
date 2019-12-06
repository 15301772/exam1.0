package mapper;

import pojo.User;

import java.util.List;


public interface UserMapper {

    public User login(User user);
    public List<User> getUserList(User user);

}
