let phoneNumber = prompt('Введите 12-ти значный номер телефона');

function formattedPhone(phone) {
  let newString = '';
  for (let i = 0; i < phone.length; i++) {
    if (i == 2) {
      newString += ' (';
    } else if (i == 5) {
      newString += ') ';
    } else if (i == 8 || i == 10) {
      newString += '-';
    }
    newString += phone.charAt(i);
  }
  return newString;
}

alert(formattedPhone(phoneNumber));
