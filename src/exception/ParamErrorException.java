package exception;

public class ParamErrorException extends Exception {

    String message;

    public ParamErrorException(String message) {
        this.message = message;
    }

    public ParamErrorException() {

    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
