
function getDate() {
    var now = new Date();

    var people = [
        ['kyc', 'September 3, 1992 21:05:00'],
        ['khu', 'November 21, 1992 08:00:00'],
        ['natalle', 'December 3, 1992 00:00:00'],
        ['eva', 'February 13, 1993 19:30:00'],
        ['shanthi', 'June 12, 1993 18:12:00'],
        ['michaelx', 'July 28, 1993 00:00:00'],
        ['hans', 'August 31, 1993 00:00:00'],
        ['becky', 'September 4, 1993 18:00:00'],
        ['sumit', 'December 19, 1993 00:00:00'],
        ['jfabi', 'December 29, 1992 06:00:00'],
        ['norman', 'February 5, 1993 06:00:00'],
        ['saya', 'September 2, 1993 00:00:00'],
    ];

    var dict = [];
    for (var i = 0; i < people.length; i += 1) {
	var age = 0;
	var date = new Date(people[i][1]);
	while (date < now) {
	    age++;
	    date.setYear(date.getFullYear() + 1);
	}
	age--;
	date.setYear(date.getFullYear() - 1);
	age += (now - date) / 1000 / 60 / 60 / 24 / (now.getYear() % 4 == 0 ? 366 : 365);
	var ageStr = age.toFixed(8);
	var fracpart = ageStr.substring(ageStr.indexOf('.'));
	dict.push([fracpart, '<div class="subdate">' + people[i][0] + ' is ' + ageStr + ' years old</div>']);
    }
    dict.sort();
    if (now.getMonth() == 8)
        var elem = dateFormat(now, 'ddd, mmm d');
    else
        var elem = dateFormat(now, 'ddd, mmmm d');
    for (var i = dict.length; --i >= dict.length - 3; ) {
	elem += dict[i][1];
    }
    $("#date").html(elem);
}

