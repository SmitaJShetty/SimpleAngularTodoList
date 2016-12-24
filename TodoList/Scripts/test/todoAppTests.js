describe('MainController', function () {
    beforeEach(module('todoApp'));

    var ctrl,listservice;

    beforeEach(inject(function ($controller, ListService) {
        listservice = ListService;
        ctrl = $controller('MainController');      
    }));

it('should have no items on load', function () {
    expect(ctrl.getList()).toEqual([]);
});

it('should retrn a sorted list sorted on Done for true value t, with done===true in the end', function () {
    var targetTodoList = [
        { Name: "A", Desc: "A Description", Done: false },
        { Name: "B", Desc: "B Description", Done: false},
        { Name: "C", Desc: "C Description", Done: true }
    ];
    var actualItemToLookFor = { Name: "A", Desc: "A Description", Done: true };
    listservice.Add(targetTodoList[0]);
    listservice.Add(targetTodoList[1]);
    listservice.Add(targetTodoList[2]);

    var actualSortedList = ctrl.getSortedList();
    expect(actualSortedList).toBeDefined();
 
    var actualIndexOfIntendedItem = actualSortedList.findIndex(x => x.Name=="C");
    console.log(actualIndexOfIntendedItem);

    var targetIndexOfIntendedItem = targetTodoList.length-1;
    
    expect(targetIndexOfIntendedItem).toEqual(actualIndexOfIntendedItem);
});

it('should return a non empty list', function () {
    var targetTodoList = [{ Name: "A", Desc: "A Description", Done: true }];

    ctrl.item = { Name: "New item name", Desc: "New item Description", Done: false };

    //if thiss works.... 
    ctrl.AddNew();

    //check if I can set order of execution on these tests so Add test can run before non empty test
    var actualTodoList = ctrl.getList();

    expect(actualTodoList).toBeDefined();
    expect(actualTodoList.length).toEqual(1);
});

it('should return a list without deleted item', function () {
    var toDeleteItem = { Name: "delete", Desc: "Delete me", Done: true };
    
    listservice.Add({Name:"A",Desc:"A Desc",Done: true});
    listservice.Add(toDeleteItem);

    var listLen=2;
    expect(ctrl.getList().length).toEqual(listLen);

    ctrl.delItem(toDeleteItem);

    expect(ctrl.getList().length).toEqual(listLen-1);
   
});
    //Testing service api
it('should return a list with added item', function () {
    listservice.Add({Name:"some name", Desc:"some desc", Done:true});
    expect(listservice.List().length===1).toBeTruthy();    
});
});
