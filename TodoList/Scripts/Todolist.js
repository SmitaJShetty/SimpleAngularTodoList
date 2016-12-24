angular.module('todoApp', [])
       .controller('MainController', ['ListService',function (ListService) {
           var self = this;

           self.getClass = function (status) {
               return {
                   Done: status,
                   Pending: !status
               };
           };
           //todo: add test file for this to git
           self.isValidItem = function () {
               if (self.item === null) { return false; }
               if (self.item === undefined) { return false; }
               var Name,Desc;

               if (self.item.Name !== undefined)
               {
                   Name = self.item.Name;
               }
               if (self.item.Desc !== undefined)
               {
                   Desc = self.item.Desc;
               }

               console.log(Name+" "+Desc);

               if ((Name === undefined) || (Name === null))
               {
                   Name = "";
               }
               
               if ((Desc === undefined) || (Desc === null))
                {
                   Desc = "";
               }

               if((Name.trim()==="") && (Desc.trim()===""))
               {
                   return false;
               }               

               return true;
           };

           self.AddNew = function () {
               if (self.isValidItem() == true) {
                   var newItem = {
                       Name: self.item.Name,
                       Desc: self.item.Desc,
                       Done: self.item.Done
                   };
                   console.log(self.getList());
                   ListService.Add(newItem);
               }
           };

           self.getSortedList = function () {
               return ListService.GetAllItemsSortedByDone();
           };

           self.getList = function () {
               return ListService.List();
           };       

           self.delItem = function (Item)
           {
               ListService.RemoveItem(Item);
           }
       }])

    .factory('ListService', [function () {
        var self = this;
        self.TodoList = [];

        return ({
            RemoveItem: function (Item) {
                var _removeIndex = self.TodoList.indexOf(Item);
            
                if (_removeIndex > -1)
                {
                   self.TodoList.splice(_removeIndex, 1);
                }
            },

            List: function () {
                return self.TodoList;
            },

            Add: function (Item) {
                   self.TodoList.push(Item);                    
            },

             GetAllItemsSortedByDone: function () {
                 return self.TodoList.sort(function (a) {
                    var x = (a.Done ===true) ? 1 : -1;
                    return x;
                });
            }
        }
        );
}]);