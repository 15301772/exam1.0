package pojo;

import java.time.DateTimeException;
import java.util.Date;

public class User {
    private Integer id;
    private String nickName;
    private String loginName;
    private String password;
    private Integer rightId;
    private Integer status;
    private String headPath;
    private Integer classId;
    private String sex;
    private String email;
    private String userEndTime;
    private Right right;

    public Right getRight() { return right; }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getStauts() {
        return status;
    }

    public void setStauts(Integer stauts) {
        this.status = stauts;
    }

    public String getHeadPath() {
        return headPath;
    }

    public void setHeadPath(String headPath) {
        this.headPath = headPath;
    }

    public Integer getClassId() {
        return classId;
    }

    public void setClassId(Integer classId) {
        this.classId = classId;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getStatus() { return status; }

    public void setStatus(Integer status) { this.status = status; }

    public Integer getRightId() { return rightId; }

    public void setRightId(Integer rightId) { this.rightId = rightId; }

    public void setRight(Right right) { this.right = right; }

    public String getUserEndTime() {
        return userEndTime;
    }

    public void setUserEndTime(String userEndTime) {
        this.userEndTime = userEndTime;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", nickName='" + nickName + '\'' +
                ", loginName='" + loginName + '\'' +
                ", password='" + password + '\'' +
                ", rightId=" + rightId +
                ", status=" + status +
                ", headPath='" + headPath + '\'' +
                ", classId=" + classId +
                ", sex='" + sex + '\'' +
                ", email='" + email + '\'' +
                ", userEndTime='" + userEndTime + '\'' +
                ", right=" + right +
                '}';
    }
}
