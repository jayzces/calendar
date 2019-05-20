<template>
    <div class="month">
        <h2>{{ getMonth }} {{ getYear }}</h2>

        <section class="table">
            <header class="day-headers">
                <div class="header">Sunday</div>
                <div class="header">Monday</div>
                <div class="header">Tuesday</div>
                <div class="header">Wednesday</div>
                <div class="header">Thursday</div>
                <div class="header">Friday</div>
                <div class="header">Saturday</div>
            </header>

            <div class="dates">
                <div class="day prev"
                    v-for="(day, index) in calendar.prevDays"
                    :key="`prev-day-${index}`">{{ day.date.getDate() }}</div>
                <div class="day"
                    v-for="(day, index) in calendar.dates"
                    :key="`day-${index}`"
                    :class="{today: isToday(day.date)}"
                    @click="open(day)">
                    <div class="date">{{ zerofill(day.date.getDate()) }}</div>

                    <div class="reservation"
                        v-for="r in getReservations(day.date)"
                        :key="r.timeStart.getTime()">
                        <time><strong>{{ getFullTime(r.timeStart) }} - {{ getFullTime(r.timeEnd) }}</strong></time>
                        <p>{{ r.company }}</p>
                    </div>
                </div>
                <div class="day next"
                    v-for="(day, index) in calendar.nextDays"
                    :key="`next-day-${index}`">{{ day.date.getDate() }}</div>
            </div>
        </section>

        <ReservePopup v-if="openPopup"
            @closePopup="closePopup" />
    </div>
</template>

<script>
    export default {
        name: 'Month',
        props: {
            calendar: {
                type: Object,
                required: true
            }
        },
        components: {
            ReservePopup: () => import('./reservePopup.vue')
        },
        data() {
            return {
                reservations: [
                    {
                        timeStart: new Date('May 16, 2019 4:00:00'),
                        timeEnd: new Date('May 16, 2019 13:00:00'),
                        company: 'Borer LLC'
                    }, {
                        timeStart: new Date('May 17, 2019 0:00:00'),
                        timeEnd: new Date('May 17, 2019 20:00:00'),
                        company: 'Corwin Ltd'
                    }, {
                        timeStart: new Date('May 19, 2019 3:00:00'),
                        timeEnd: new Date('May 19, 2019 7:00:00'),
                        company: 'Corwin Ltd'
                    }, {
                        timeStart: new Date('May 20, 2019 7:00:00'),
                        timeEnd: new Date('May 20, 2019 9:00:00'),
                        company: 'Corwin Ltd'
                    }, {
                        timeStart: new Date('May 22, 2019 10:00:00'),
                        timeEnd: new Date('May 22, 2019 12:00:00'),
                        company: 'Corwin Ltd'
                    }
                ],
                openPopup: false
            }
        },
        methods: {
            open(day) {
                this.openPopup = true
            },
            isToday(day) {
                let today = new Date(this.calendar.today.getTime())
                return today.setHours(0,0,0,0) == day.getTime()
            },
            zerofill(n) {
                if (n < 10) return `0${n}`
                return n
            },
            getReservations(date) {
                return this.reservations.filter(r => {
                    let reservation = new Date(r.timeStart.getTime())
                    return reservation.setHours(0,0,0,0) == date.getTime()
                })
            },
            getFullTime(date) {
                let hours = date.getHours()
                let mins = this.zerofill(date.getMinutes())

                if (hours == 0) {
                    return `12:${mins} AM`
                } else if (hours < 12) {
                    return `${this.zerofill(hours)}:${mins} AM`
                } else if (hours == 12) {
                    return `12:${mins} PM`
                } else if (hours < 24) {
                    return `${this.zerofill(hours - 12)}:${mins} PM`
                }

                return ''
            },
            closePopup() {
                this.openPopup = false
            }
        },
        computed: {
            getMonth() {
                let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                return months[this.calendar.dates[0].date.getMonth()]
            },
            getYear() {
                return this.calendar.dates[0].date.getFullYear()
            }
        }
    }
</script>

<style>
    h2 {
        margin: 0;
        text-align: center;
    }

    .month {
        position: relative;
        margin: 0 auto;
        max-width: calc(100vw - 60px);
    }

    .month:not(:first-child) {
        margin-top: 36px;
    }

    .table {
        margin-top: 16px;
        border-radius: 4px;
        box-shadow: 0 0 10px hsla(0, 0%, 0%, 0.1);
    }

    .day-headers {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }

    .header {
        background-color: var(--accent);
        text-align: center;
        line-height: 48px;
        font-size: 20px;
        color: white;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .dates {
        background-color: hsl(0, 0%, 95%);
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-gap: 1px;
    }

    .day {
        background-color: white;
        position: relative;
        padding: 12px;
        height: 120px;
        cursor: pointer;
        overflow: hidden;
    }

    .prev,
    .next {
        color: hsla(0, 0%, 0%, 0.24);
        pointer-events: none;
    }

    .today {
        box-shadow: 0 0 5px var(--accent);
        z-index: 2;
    }

    .date {
        font-size: 20px;
        color: hsla(0, 0%, 0%, 0.54);
    }

    .reservation {
        background-color: hsl(200, 90%, 95%);
        margin-top: 4px;
        padding: 8px;
        font-size: 14px;
        border-radius: 8px;
    }

    .reservation p {
        margin: 2px 0 0;
        font-size: 16px;
    }
</style>