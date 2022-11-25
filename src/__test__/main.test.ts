/**
 * @jest-environment jsdom
 */

import * as functions from "../ts/main";
import * as functionfromfunctions from "../ts/functions";
import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import { IAddResponse } from "../ts/models/IAddResult";
import { Todo } from "../ts/models/Todo";

describe("createNewTodo", () => {
  test("should call function createHtml if result succeed", () => {
    //Arrange/Förutsättningar
    let todoText: string = "koda";
    let todos: Todo[] = [];
    let spy = jest.spyOn(functions, "createHtml").mockReturnValue();

    //Act/Agera på funktion
    functions.createNewTodo(todoText, todos);

    //Assert/Verifiera resultat
    expect(spy).toHaveBeenCalled();
  });

  test("should call function displayError if result is false", () => {
    //Arrange/Förutsättningar
    document.body.innerHTML = `
    <div id="error" class="error"></div>  `;
    let todoText: string = "bu";
    let todos: Todo[] = [];
    let spy = jest.spyOn(functions, "displayError").mockReturnValue();

    //Act/Agera på funktion
    functions.createNewTodo(todoText, todos);

    //Assert/Verifiera resultat
    expect(spy).toHaveBeenCalled();
  });

  //testa addToDo?
});

describe("createHtml", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should create html for li-element and add to ul-list", () => {
    //Arrange/Förutsättningar
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    let ulTag = document.getElementById("todos") as HTMLUListElement;
    let liList: Todo[] = [
      new Todo("lära mig koda", false),
      new Todo("lära mig testning", false),
    ];

    //Act/Agera på funktion
    functions.createHtml(liList);

    //Assert/Verifiera resultat
    expect(ulTag.innerHTML).toBe(
      `<li class=\"todo__text\">lära mig koda</li><li class=\"todo__text\">lära mig testning</li>`
    );
  });
});

describe("toggleTodo", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should call changeTodo and createHtml", () => {
    //Arrange/Förutsättningar
    let myToDo: Todo = new Todo("julpynta", false);
    let spy1 = jest
      .spyOn(functionfromfunctions, "changeTodo")
      .mockReturnValue();
    let spy2 = jest.spyOn(functions, "createHtml").mockReturnValue();
    //Act/Agera på funktion
    functions.toggleTodo(myToDo);
    //Assert/Verifiera resultat
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});

describe("displayError", () => {
  test("should display error message and class show", () => {
    //Arrange/Förutsättningar
    let errorMessage: string = "mitt felmeddelande";
    document.body.innerHTML = `
      <div id="error" class="error"></div>
    `;

    //Act/Agera på funktion
    functions.displayError(errorMessage, true);

    //Assert/Verifiera resultat
    expect(document.getElementById("error")?.innerHTML).toBe(errorMessage);
    expect(document.getElementById("error")?.classList.length).toBe(2);
  });

  test("should display error message and NOT class show", () => {
    //Arrange/Förutsättningar
    let errorMessage: string = "mitt felmeddelande";
    document.body.innerHTML = `
    <div id="error" class="error"></div>
  `;
    //Act/Agera på funktion
    functions.displayError(errorMessage, false);

    //Assert/Verifiera resultat
    expect(document.getElementById("error")?.innerHTML).toBe(errorMessage);
    expect(document.getElementById("error")?.classList.length).toBe(1);
  });
});

describe("clearTodos", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should call removeAllTodos and createHtml", () => {
    //Arrange/Förutsättningar
    let myXmasList: Todo[] = [new Todo("julstäda", false)];
    let spy1 = jest
      .spyOn(functionfromfunctions, "removeAllTodos")
      .mockReturnValue();
    let spy2 = jest.spyOn(functions, "createHtml").mockReturnValue();
    //Act/Agera på funktion
    functions.clearTodos(myXmasList);
    //Assert/Verifiera resultat
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});
