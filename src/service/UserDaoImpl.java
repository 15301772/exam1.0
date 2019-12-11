package service;

import mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pojo.User;

import java.util.HashMap;
import java.util.List;

@Service
public class UserDaoImpl implements UserDao {
    @Autowired
    UserMapper userMapper;

    @Override
    public User Login(User user) {
        return userMapper.login(user);
    }

    @Override
    public int count(User user) { return userMapper.count(user); }

    @Override
    public int loginDateTime(HashMap hashMap) { return userMapper.loginDateTime(hashMap); }

    @Override
    public List<User> getUserList(HashMap hashMap) {
        return userMapper.getUserList(hashMap);
    }

    @Override
    public int addUser(User user) { return userMapper.addUser(user); }

    @Override
    public int delete(Integer id) { return userMapper.delete(id); }

    @Override
    public int update(User user) { return userMapper.update(user); }

}
