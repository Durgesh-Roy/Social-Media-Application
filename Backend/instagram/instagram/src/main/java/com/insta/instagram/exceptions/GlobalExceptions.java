package com.insta.instagram.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptions {
    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorDetails>userExceptionHandler(UserException ue, WebRequest req){
        ErrorDetails err=new ErrorDetails(ue.getMessage(),req.getDescription(false),
                LocalDateTime.now());
        return new ResponseEntity<ErrorDetails>(err, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDetails>MethodArgumentNotValidExceptionHandler(MethodArgumentNotValidException me){
        ErrorDetails err=new ErrorDetails(me.getBindingResult().getFieldError().getDefaultMessage(),"validation error",
                LocalDateTime.now());
        return new ResponseEntity<ErrorDetails>(err, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails>otherExceptionHandler(Exception ue, WebRequest req){
        ErrorDetails err=new ErrorDetails(ue.getMessage(),req.getDescription(false),
                LocalDateTime.now());
        return new ResponseEntity<ErrorDetails>(err, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CommentException.class)
    public ResponseEntity<ErrorDetails> commentExceptionHandler(CommentException ce, WebRequest req) {
        ErrorDetails err = new ErrorDetails(
                ce.getMessage(),
                req.getDescription(false),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(PostException.class)
    public ResponseEntity<ErrorDetails> postExceptionHandler(PostException pe, WebRequest req) {
        ErrorDetails err = new ErrorDetails(
                pe.getMessage(),
                req.getDescription(false),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }


}
