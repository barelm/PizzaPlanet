exports.calculateAgeByBirthDate = function(dateOfBirth, dateToCalculate) {

    // Get the year, month and day of the date to calculate
    var calculateYear = dateToCalculate.getFullYear();
    var calculateMonth = dateToCalculate.getMonth();
    var calculateDay = dateToCalculate.getDate();

    // Get the year, month and day of the date of birth
    var birthYear = dateOfBirth.getFullYear();
    var birthMonth = dateOfBirth.getMonth();
    var birthDay = dateOfBirth.getDate();

    // Calculate the differences between the two dates
    var age = calculateYear - birthYear;
    var ageMonth = calculateMonth - birthMonth;
    var ageDay = calculateDay - birthDay;

    // Decrease one year from the age if it is needed
    if (ageMonth < 0 || (ageMonth == 0 && ageDay < 0)) {
        age = parseInt(age) - 1;
    }

    // Return the calculated age in years
    return age;
};