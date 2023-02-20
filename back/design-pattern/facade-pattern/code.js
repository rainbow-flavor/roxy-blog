const code = `import java.util.Date;
import java.util.Random;
import java.util.UUID;

public class Main {
    public static void main(String[] args) {
        CodeRunnerFacade facade = new CodeRunnerFacade();
        facade.runCode("this is code");
    }
}

class CodeRunnerFacade{
    Container container;
    String generatedId = UUID.randomUUID().toString();
    
    CodeRunnerFacade(){
        container = new Container(new Runner(), generatedId);
    }
    
    public String runCode(String code){
        if(container.checkContainerId(generatedId)){
            return container.entryPoint(code);
        }
        throw new RuntimeException("존재하지 않는 컨테이너");
    }
}

class Runner{
    String run(String code) {
        System.out.println("코드가 실행되었습니다. " + code);
        return "ok";
    }
}

class Container{
    Runner runner;
    String containerId;
    
    Container(Runner runner, String containerId){
        this.runner = runner;
        this.containerId = containerId;
    }
    
    boolean checkContainerId(String token){
        return token.equals(containerId);
    }
    
    String entryPoint(String code){
        return runner.run(code);
    }
}
`;

export default code;
