package pojo;

import java.util.Date;

public class Exam {
    Integer id;
    String examName;
    String examPublisher;
    Integer classId;
    Integer teacherId;
    Integer publish;
    Date publishTime;
    Integer examStatus;

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getExamName() { return examName; }

    public void setExamName(String examName) { this.examName = examName; }

    public String getExamPublisher() { return examPublisher; }

    public void setExamPublisher(String examDecript) { this.examPublisher = examDecript; }

    public Integer getClassId() { return classId; }

    public void setClassId(Integer classId) { this.classId = classId; }

    public Integer getTeacherId() { return teacherId; }

    public void setTeacherId(Integer teacherId) { this.teacherId = teacherId; }

    public Integer getPublish() { return publish; }

    public void setPublish(Integer publish) { this.publish = publish; }

    public Date getPublishTime() { return publishTime; }

    public void setPublishTime(Date publishTime) { this.publishTime = publishTime; }

    public Integer getExamStatus() { return examStatus; }

    public void setExamStatus(Integer examStauts) { this.examStatus = examStauts; }
}
