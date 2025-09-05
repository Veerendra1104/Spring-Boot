package com.Veeru.demo.Service;

import com.Veeru.demo.Entity.Student;
import com.Veeru.demo.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentrepo ;

    public Student saveStudent(Student student){
        return studentrepo.save(student);
    }

    public List<Student> getStudents(){
        return studentrepo.findAll();
    }


    public Student getStudentById(Long id){
        return studentrepo.findById(id).orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }


    public Student updateStudent(Long id ,Student student){
        Student std = getStudentById(id);
        std.setName(student.getName());
        std.setAge(student.getAge());
        std.setEmail(student.getEmail());
        return studentrepo.save(std);
    }

    public void delet(Long id){
        studentrepo.deleteById(id);
    }


}
