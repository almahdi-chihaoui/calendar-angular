import { Component } from '@angular/core';

class Day {

    todayDate:boolean = false;
    outOfTheMonth:boolean = false;
    isSelected:boolean = false;

    constructor(public dayName:string, public dayDate:number, public dayMonth:number, public dayYear:number) {
    }

    //...

}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    private daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    private monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    private firstDayOfWeek = 0;
    private limitDayNameChar = 3;
    private limitMonthNameChar = 3;
    private month = [[], [], [], [], [], []];
    private currentWeek:number;
    private watchedWeek:number;
    private currentMonth:number;
    private watchedMonth:number;
    private currentYear:number;
    private watchedYear:number;


    monthView:boolean = true; //Default view
    weekView:boolean = false;
    oneDayView:boolean = false;
    twoDaysView:boolean = false;


    constructor() {
        console.log('Component - is created.');
        this.updateDaysOfWeek();
        this.renderCurrentMonth();
    }

    private updateDaysOfWeek():void {
        console.log('Updating days of week table..');
        if (this.firstDayOfWeek == 0) {
            console.log('First day is Sunday .. same as default.');
        } else {
            let count = 0;
            let updatedDaysOfWeek = [];
            let indexOfTheDay = this.firstDayOfWeek;
            while (count < 7) {
                if (indexOfTheDay > 6) {
                    indexOfTheDay = 0;
                }
                updatedDaysOfWeek[count] = this.daysOfWeek[indexOfTheDay];
                count++;
                indexOfTheDay++;
            }
            this.daysOfWeek = updatedDaysOfWeek;
            console.log('Updated days of week : ' + updatedDaysOfWeek)
        }
    }

    private getMonthNumberOfDays(month:number):number {
        if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
            return 31;
        } else if (month == 1) {
            if (this.watchedYear % 4 == 0) {
                return 29;
            } else {
                return 28;
            }
        } else {
            return 30
        }
    }

    private renderCurrentMonth() {
        let date = new Date();
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
        console.log('Current year is :' + this.currentYear);
        //this.prepareMonth(2, 1, 7); //For test ..

        this.watchedMonth = this.currentMonth;
        this.watchedYear = this.currentYear;

        this.prepareMonth(
            date.getDay(),
            date.getDate(),
            this.currentMonth
        );

        this.watchedWeek = this.currentWeek;

    }

    private prepareMonth(day:number, dayDate:number, month:number) {
        console.log('Preparing the month object ..');
        let indexOfTheDay = day;
        let numberOfDays = this.getMonthNumberOfDays(month);

        while (dayDate > 1) {
            dayDate--;
            indexOfTheDay--;
            if (indexOfTheDay < 0) {
                indexOfTheDay = 6;
            }

        }
        console.log('First day of the month : ' + this.daysOfWeek[indexOfTheDay]);

        let previousMonth = month - 1;
        if (previousMonth < 0) {
            previousMonth = 11;
        }
        let previousMonthNumberOfDays = this.getMonthNumberOfDays(previousMonth);

        let dayFiller = previousMonthNumberOfDays - indexOfTheDay + 1;
        let dayIndex = 0;
        let i = 0;
        let monthIndex = month - 1;
        if (monthIndex < 0) {
            monthIndex = 11;
        }
        let today = new Date;
        //preparing the month object ..

        while (dayIndex < 42) {

            if (dayIndex >= 0 && dayIndex < 7) {
                if (dayFiller > previousMonthNumberOfDays) {
                    dayFiller = 1;
                    monthIndex++;
                    if (monthIndex > 11) {
                        monthIndex = 0
                    }
                }

                this.month[0][i] = new Day(this.daysOfWeek[i], dayFiller, monthIndex, this.watchedYear);
                if (dayFiller > 14) {
                    this.month[0][i].outOfTheMonth = true;
                }
                if (dayFiller == today.getDate() && monthIndex == today.getMonth() && this.watchedYear == today.getFullYear()) {
                    this.month[0][i].todayDate = true;
                    this.currentWeek = 0;
                }

                dayFiller++;
                dayIndex++;
                i++;
                if (i == 7) {
                    i = 0;
                }
            }
            if (dayIndex >= 7 && dayIndex < 14) {

                this.month[1][i] = new Day(this.daysOfWeek[i], dayFiller, monthIndex, this.watchedYear);

                if (dayFiller > 14) {
                    this.month[1][i].outOfTheMonth = true;
                }
                if (dayFiller == today.getDate() && monthIndex == today.getMonth() && this.watchedYear == today.getFullYear()) {
                    this.month[1][i].todayDate = true;
                    this.currentWeek = 1;

                }

                dayFiller++;
                dayIndex++;
                i++;
                if (i == 7) {
                    i = 0;
                }
            }
            if (dayIndex >= 14 && dayIndex < 21) {

                this.month[2][i] = new Day(this.daysOfWeek[i], dayFiller, monthIndex, this.watchedYear);
                if (dayFiller == today.getDate() && monthIndex == today.getMonth() && this.watchedYear == today.getFullYear()) {
                    this.month[2][i].todayDate = true;
                    this.currentWeek = 2;
                }

                dayFiller++;
                dayIndex++;
                i++;
                if (i == 7) {
                    i = 0;
                }
            }
            if (dayIndex >= 21 && dayIndex < 28) {

                this.month[3][i] = new Day(this.daysOfWeek[i], dayFiller, monthIndex, this.watchedYear);

                if (dayFiller == today.getDate() && monthIndex == today.getMonth() && this.watchedYear == today.getFullYear()) {
                    this.month[3][i].todayDate = true;
                    this.currentWeek = 3;

                }

                dayFiller++;
                dayIndex++;
                i++;
                if (i == 7) {
                    i = 0;
                }
            }
            if (dayIndex >= 28 && dayIndex < 35) {

                if (dayFiller > numberOfDays) {
                    dayFiller = 1;
                    monthIndex++;
                    if (monthIndex > 11) {
                        monthIndex = 0
                    }
                }

                this.month[4][i] = new Day(this.daysOfWeek[i], dayFiller, monthIndex, this.watchedYear);
                if (dayFiller < 14) {
                    this.month[4][i].outOfTheMonth = true;
                }
                if (dayFiller == today.getDate() && monthIndex == today.getMonth() && this.watchedYear == today.getFullYear()) {
                    this.month[4][i].todayDate = true;
                    this.currentWeek = 4;

                }

                dayFiller++;
                dayIndex++;
                i++;
                if (i == 7) {
                    i = 0;
                }
            }
            if (dayIndex >= 35 && dayIndex < 42) {

                if (dayFiller > numberOfDays) {
                    dayFiller = 1;
                    monthIndex++;
                    if (monthIndex > 11) {
                        monthIndex = 0
                    }
                }

                this.month[5][i] = new Day(this.daysOfWeek[i], dayFiller, monthIndex, this.watchedYear);
                if (dayFiller < 14) {
                    this.month[5][i].outOfTheMonth = true;
                }
                if (dayFiller == today.getDate() && monthIndex == today.getMonth() && this.watchedYear == today.getFullYear()) {
                    this.month[5][i].todayDate = true;
                    this.currentWeek = 5;

                }

                dayFiller++;
                dayIndex++;
                i++;
                if (i == 7) {
                    i = 0;
                }
            }

        }

        console.log('The month object : ');
        console.log(this.month);


    }

    private prevMonthBtnClicked() {
        console.log('To previous month ..');

        this.watchedMonth--;
        if (this.watchedMonth < 0) {
            this.watchedMonth = 11;
            this.watchedYear--;
        }

        if (this.month[0][0].dayDate > 1) {
            //that day belong to the prev month
            this.prepareMonth(
                0,
                this.month[0][0].dayDate,
                this.watchedMonth
            )
        } else {
            //the day belong to the current month
            this.prepareMonth(
                6,
                this.getMonthNumberOfDays(this.watchedMonth),
                this.watchedMonth
            )
        }

    }

    private nextMonthBtnClicked() {
        console.log('To next month ..');

        this.watchedMonth++;
        if (this.watchedMonth > 11) {
            this.watchedMonth = 0;
            this.watchedYear++;
        }

        this.prepareMonth(
            6,
            this.month[5][6].dayDate,
            this.watchedMonth
        )

    }

    private prevWeekBtnClicked() {
        console.log('To previous week ..');

        this.watchedWeek--;

        if(this.watchedWeek <= 0 && this.month[0][0].dayMonth != this.watchedMonth) {

            this.watchedMonth--;
            if (this.watchedMonth < 0) {
                this.watchedMonth = 11;
                this.watchedYear--;
            }
            this.prepareMonth(
                0,
                this.month[0][0].dayDate,
                this.watchedMonth
            );
            this.watchedWeek = 5;
            while (this.month[this.watchedWeek][0].dayMonth != this.watchedMonth) {
                this.watchedWeek--;
            }
        } else if (this.watchedWeek < 0) {
                this.watchedMonth--;
                if (this.watchedMonth < 0) {
                    this.watchedMonth = 11;
                    this.watchedYear--;
                }
                this.prepareMonth(
                    6,
                    this.getMonthNumberOfDays(this.watchedMonth),
                    this.watchedMonth
                );
                this.watchedWeek = 4;
            }

        console.log('watched week : ' + this.watchedWeek);
        console.log('watched month : ' + this.watchedMonth);

    }

    private nextWeekBtnClicked() {
        console.log('To next week ..');
        this.watchedWeek++;
        if (this.watchedWeek > 3 && this.watchedWeek < 6) {
            if (this.month[this.watchedWeek][6].dayMonth != this.watchedMonth) {
                console.log('initialize week ..');
                this.watchedWeek = 0;
                this.watchedMonth++;
                if (this.watchedMonth > 11) {
                    this.watchedMonth = 0;
                    this.watchedYear++;
                }
                this.prepareMonth(
                    6,
                    this.month[5][6].dayDate,
                    this.watchedMonth
                );

            }

        } else if(this.watchedWeek > 5) {
            this.watchedWeek = 1;
            this.watchedMonth++;
            if (this.watchedMonth > 11) {
                this.watchedMonth = 0;
                this.watchedYear++;
            }
            this.prepareMonth(
                6,
                this.month[5][6].dayDate,
                this.watchedMonth
            );
        }

        console.log('watched week : ' + this.watchedWeek);
        console.log('watched month : ' + this.watchedMonth);
    }

    private selectDay(day) {
        let i = 0;
        while (i < 6) {
            let j = 0;
            while (j < 7) {
                if (day == this.month[i][j]) {
                    day.isSelected = !day.isSelected;
                } else {
                    if (this.month[i][j].isSelected) {
                        this.month[i][j].isSelected = false;
                    }
                }
                j++;
            }
            i++;
        }
        console.log('the selected day is : ' + day.dayName + ' ' + day.dayDate + ' ' + day.dayMonth + ' ' + day.dayYear);
    }

}













