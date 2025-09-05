package com.Veeru.demo.Controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String home(){
        return "hello ";
    }

    @GetMapping("/love")
    public String print(){
        return " Arya ❤️❤ Veeru ";
    }

}
