# originals-backend
### backend of originals webApp

##### Originals’ WebApp Development Design

* * *

#### Features
1.	Main Page   
    1. Setting Articles shown on main page   
    2. The nearest date of meeting or the most important meeting can be set   
2.	meeting   
    1.	gather in meeting   
        1.	writing meeting   
            1.	title   
            2.	time   
            3.	place   
            4.	price   
            5.	etc   
            6.	deadline   
                A.	if deadline is over. Participating is impossible.    
            7.	Organizer can close the booking, then participants cannot cancel or reserve the meeting   
        2.	update   
        3.	delete   
    2.	participating in meeting   
        1.	showing list who are in meeting   
        2.	participating is impossible if meeting is overbooked.   
        3.	Cancelling is Free.    
        4.	If limit time is over or Organizer close the booking, additional participant is impossible   
3.	bulletin   
    1.	writing article   
        1.	title   
        2.	content   
        3.	photos   
    2.	update   
    3.	delete   
    4.	setting announcement   
        1.	setting announcement on top of all articles   
        2.	cancel the announcement   
    5.	classifying articles with some standards   
        1.	standards   
            1.	announcement   
            2.	free articles   
            3.	Introduction   
            4.	Feedback   
            5.	Anonymous articles   
        2.	By standards bulletin list can be sorted.   
    6.	No paging   
4.	Like   
    1.	Setting like on posts, comments   
    2.	Like Count can be shown on post and comment   
    3.	People can be shown who have clicked the like on post   
5.	Comment    
    1.	Leaving a comment on post   
    2.	Comment on comment feature is limited   
6.	Views   
    1.	Views are shown on the post   
    2.	Views are not overlapped specified by user’s ID   
7.	Book   
    1.	All the books can be listed.   
    2.	Search features must be implemented   
        1.	Title   
        2.	Publisher   
        3.	Author   
        4.	content   
    3.	Books are listed in two ways   
        1.	Grid   
            1.	Grid shows the photo of books    
        2.	List   
            1.	List shows the title of books   
    4.	Book’s detail page must show the reservation status on calendar
8.	Reservation   
    1.	In book page the reservation status is shown.   
    2.	User is shown in calendar with reservation start date and end date.    
    3.	If there is no reservation, user can reserve the book for 2 weeks.   
        1.	2 weeks’ start date and end date is automatically set.   
    4.	If there is reservation, user can reserve the book after the end date of just before reservation.   
    5.	Reservation can be extended if there is no reservation after the end date.   
9.	Profile   
    1.	데이터베이스 내 데이터들 showing   
