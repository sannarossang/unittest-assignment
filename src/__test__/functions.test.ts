import { addTodo, changeTodo, removeAllTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo";
import { IAddResponse } from "../ts/models/IAddResult";

describe("changeToDo", () => {
  test("should change status of to do", () => {
    //Arrange/Förutsättningar
    let toDo: Todo = new Todo("lära mig testning", false);
    //Act/Agera på funktion
    changeTodo(toDo);
    //Assert/Verifiera resultat
    expect(toDo.done).toBe(true);
  });
});

describe("removeAllToDos", () => {
  test("should remove all to dos", () => {
    //Arrange/Förutsättningar
    let myToDoList: Todo[] = [
      new Todo("lära mig testning", false),
      new Todo("lära mig testning", true),
    ];
    //Act/Agera på funktion
    removeAllTodos(myToDoList);
    //Assert/Verifiera resultat
    expect(myToDoList.length).toBe(0);
  });
});

describe("addToDo", () => {
  test("should add new todo if length > 2", () => {
    //Arrange/Förutsättningar
    let addNewToDo: IAddResponse = addTodo("Dansa", []);
    //Act/Agera på funktion
    //Assert/Verifiera resultat
    expect(addNewToDo.success).toBe(true);
  });

  test("should not add new todo if length < 2", () => {
    //Arrange/Förutsättningar
    let addNewToDo: IAddResponse = addTodo("Gå", []);
    //Act/Agera på funktion
    //Assert/Verifiera resultat
    expect(addNewToDo.success).toBe(false);
  });

  test("should show error message if length > 2", () => {
    //   Arrange/Förutsättningar
    let todoText: string = "Gå";
    //   Act/Agera på funktion
    let response: IAddResponse = addTodo(todoText, []);
    //   Assert/Verifiera resultat
    expect(response.success).toBe(false);
    expect(response.error).toBe("Du måste ange minst tre bokstäver");
  });

  test("should not show error message if length < 2", () => {
    //   Arrange/Förutsättningar
    let todoText: string = "Dansa";
    //   Act/Agera på funktion
    let response: IAddResponse = addTodo(todoText, []);
    //   Assert/Verifiera resultat
    expect(response.success).toBe(true);
    expect(response.error).toBe("");
  });
});
