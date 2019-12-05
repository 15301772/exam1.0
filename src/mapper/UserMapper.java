package mapper;

import pojo.User;

import java.util.HashMap;
import java.util.List;


public interface UserMapper {

    public User login(User user);
    public List<User> getUserList(User user);

    public User getUserByid(int id);

    public int updatehead(User user);

    public int checkUserName(String name);

    public List<User> searchByWhere(User user);

    public List<User> search(User user);

    public Integer userCount();

    public List<User> selectLayUitable();

    public List<User> selectpage(HashMap map);

    public int update(User user);
    public int delete(Integer user_id);
    public int addUser(User user);
    public List<User> select(HashMap map);

}
