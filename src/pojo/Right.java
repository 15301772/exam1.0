package pojo;

public class Right {
    private Integer id;
    private String rightName;

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getRightName() { return rightName; }

    public void setRightName(String rightName) { this.rightName = rightName; }

    @Override
    public String toString() {
        return "Right{" +
                "id=" + id +
                ", rightName='" + rightName + '\'' +
                '}';
    }
}
