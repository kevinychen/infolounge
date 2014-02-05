
function getDate() {
    var now = new Date();

    var people = [
	['kyc2915', 'September 3, 1992 21:05:00'],
        ['kevhu', 'November 21, 1992 08:00:00'],
	['eunicel', 'November 21, 1993 08:00:15'],
        ['natalle', 'December 3, 1992 00:00:00'],
        ['evayeung', 'February 13, 1993 00:00:00'],
        ['shanthir', 'June 12, 1993 00:00:00'],
        ['michaelx', 'July 28, 1993 00:00:00'],
        ['hsusilo', 'August 31, 1993 00:00:00'],
        ['beckyshi', 'September 4, 1993 00:00:00'],
        ['summit', 'December 19, 1993 00:00:00'],
        ['jfabi', 'December 29, 1992 00:00:00'],
        ['normandy', 'February 5, 1993 00:00:00'],
        ['sayadate', 'September 2, 1993 00:00:00'],
	['fishr', 'October 31, 1992 00:00:00'],
        ['vhung', 'October 16, 1992 00:00:00'],
	['3dg42', 'April 19, 1993 00:00:00'],
	['hguarino', 'June 23, 1993 00:00:00'],
	['jcorzo', 'January 18, 1993 00:00:00'],
	['zsheinko', 'October 28, 1994 00:00:00'],
	['stalyc', 'August 10, 1993 00:00:00'],
	['mcdryan', 'December 13, 1992 00:00:00'],
	['ytung', 'January 15, 1993 00:00:00'],
	['mabrams', 'September 2, 1995 00:00:15'],
	['jenniez', 'March 24, 1993 00:00:00'],
	['jwei314', 'March 14, 1993 04:00:00'],
	['cmzhang', 'October 8, 1994 00:00:00'],
	['eurahko', 'May 17, 1993 00:00:00'],
	['jfchen', 'October 14, 1992 00:00:00'],
	['pudjeeb', 'October 10, 1992 00:00:00'],
	['trzhang', 'December 12, 2003 00:00:00'],
	['yzhang17', 'February 13, 1996 00:00:01'],
	['xtnbui', 'January 4, 1996 00:00:00'],
	['tricias', 'May 23, 1995 00:00:00'],
	['tiffwang', 'January 1, 1995 00:00:00'],
	['lotusez3', 'March 24, 1995 00:00:00'],
	['kkarthur', 'August 29, 1995 00:00:00'],
	['chenbon', 'August 28, 1996 00:00:00'],
	['akwasio', 'February 15, 1995 00:00:00'],
	['mwu2015', 'April 8, 1993 00:00:00'],
	['sallylin', 'May 22, 1993 00:00:00'],
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
        var ageIncStr = (age - 0.000001).toFixed(8);
	var fracpart = ageIncStr.substring(ageIncStr.indexOf('.'));
	dict.push([fracpart, '<div class="subdate">' + people[i][0] + ' is ' + ageStr + ' years old</div>']);
    }
    dict.sort();
    if (now.getMonth() == 8)
        var elem = dateFormat(now, 'ddd, d mmm');
    else
        var elem = dateFormat(now, 'ddd, d mmmm');
    for (var i = dict.length; --i >= dict.length - 3; ) {
	elem += dict[i][1];
    }
    $("#date").html(elem);
}

