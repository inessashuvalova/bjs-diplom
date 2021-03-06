"use strict";

const newLogoutButton = new LogoutButton(); 
  newLogoutButton.action = () => ApiConnector.logout((response) => {
  if (response.success) {
    location.reload();
   }
});

ApiConnector.current((response) => {
   if (response.success) {
   ProfileWidget.showProfile(response.data);
}
});

const ratesBoard = new RatesBoard(); 
function getStocks() {
   ApiConnector.getStocks(response => {
       if (response.success) {
           ratesBoard.clearTable();
           ratesBoard.fillTable(response.data);
       }
   })
}
getStocks();
setInterval(getStocks, 60000);

 const money = new MoneyManager(); 
 money.addMoneyCallback = data => ApiConnector.addMoney(data, (response) => {
   if (response.success) {
     ProfileWidget.showProfile(response.data);
     money.setMessage(response.success, `Баланс пополнен на ${data.amount} ${data.currency}`);
   } else {
       money.setMessage(response.success, `${response.error}`);
   }
})

money.conversionMoneyCallback = data => ApiConnector.convertMoney(data, (response) => {
   if (response.success) {
      ProfileWidget.showProfile(response.data);
      money.setMessage(response.success, `Успешная конвертация`);
  } else {
      money.setMessage(response.success, `${response.error}`);
  }
})



money.sendMoneyCallback = data => ApiConnector.transferMoney(data, (response) => {
   if (response.success) {
      ProfileWidget.showProfile(response.data);
      money.setMessage(response.success, `Успешный перевод`);
  } else {
      money.setMessage(response.success, `${response.error}`);
  }
})

const favorites = new FavoritesWidget(); 
ApiConnector.getFavorites((response) => {
   if (response.success) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      money.updateUsersList(response.data);
   } 
})

favorites.addUserCallback = data => ApiConnector.addUserToFavorites(data, (response) => {
   if (response.success) {
      favorites.clearTable();
            favorites.fillTable(response.data);
            money.updateUsersList(response.data);
            money.setMessage(response.success, `Пользователь ${data.id} ${data.name} добавлен`);
  } else {
      money.setMessage(response.success, `${response.error}`);
  }
})

favorites.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, (response) => {
   if (response.success) {
      favorites.clearTable();
            favorites.fillTable(response.data);
            money.updateUsersList(response.data);
            money.setMessage(response.success, `Пользователь ID ${data} удалён`);
  } else {
      money.setMessage(response.success, `${response.error}`);
  }
})


