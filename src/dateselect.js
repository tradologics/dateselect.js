/* jshint esversion: 9 */
(function(dsjs, undefined) {

    const fullMonthNames = ["", "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const shortMonthNames = fullMonthNames.map(x=>x.slice(0,3));

    const templateWrapper = `
    <div class="dsjs-wrapper dsjs-widget">
        <header>{{header}}</header>
        <div class="dsjs-row">
            {{components}}
        </div>
        <select id="dsjs-template">
        <option id="dsjs-template-option"></option>
    </select></div>`;

    const templateCalendar = `
    <div class="dsjs-component dsjs-calendar" id="{{id}}">
        <table cellspacing="0" cellpadding="0" border="0">
            <thead>
                <tr>
                    <th class="align-left"><button type="button" onclick="dsjs.prevMonth(this)">‹</button></th>
                    <th colspan="5">
                        <select class="select-month" onchange="dsjs.renderCalendar(this)">
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                        <select class="select-year" onchange="dsjs.renderCalendar(this)">
                        {{years}}
                        </select>
                    </th>
                    <th class="align-right"><button type="button" onclick="dsjs.nextMonth(this)">›</button></th>
                </tr>
                <tr>
                    <th>MO</th>
                    <th>TU</th>
                    <th>WE</th>
                    <th>TH</th>
                    <th>FR</th>
                    <th>SA</th>
                    <th>SU</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>`;

    const templateTime = `
    <div class="dsjs-component dsjs-time">
        <p class="align-left" style="white-space:nowrap">
            <input type="number" value="12" min="1" max="12" value="0" name="hours" onblur="if (this.value < 10) this.value='0'+this.value;"> :
            <input type="number" value="00" min="0" max="59" value="0" name="minutes" onblur="if (this.value < 10) this.value='0'+this.value;"> :
            <input type="number" value="00" min="0" max="59" value="0" name="seconds" onblur="if (this.value < 10) this.value='0'+this.value;">
            &nbsp;<select name="ampm" class="ampm chevron">
                <option value="am">am</option>
                <option value="pm">pm</option>
            </select>&nbsp;
        </p>
        {{timezone}}
        {{timestamp}}
        <p class="align-center">
            <button class="primary" disabled>Save and close</button>
        </p>
    </div>`;

    const templateTimezone = `
    <p>
        <select name="utc-offet" class="utc-offset" style="margin:0 auto" onchange="setSelectWidth(this)">
        <option value="0">(UTC) Coordinated Universal Time</li>
        <option value="-8">(UTC-08:00) Pacific Time (US &amp; Canada)</li>
        <option value="-7">(UTC-07:00) Mountain Time (US &amp; Canada)</li>
        <option value="-7">(UTC-07:00) Mountain Time (Canada)</li>
        <option value="-6">(UTC-06:00) Central Time (US &amp; Canada)</li>
        <option value="-5">(UTC-05:00) Eastern Time (US &amp; Canada)</li>
        <option value="-12">(UTC-12:00) International Date Line West</li>
        <option value="-11">(UTC-11:00) Midway Island, American Samoa</li>
        <option value="-10">(UTC-10:00) Hawaii</li>
        <option value="-9">(UTC-09:00) Alaska</li>
        <option value="-8">(UTC-08:00) Baja California</li>
        <option value="-7">(UTC-07:00) Arizona</li>
        <option value="-7">(UTC-07:00) Chihuahua, La Paz, Mazatlan</li>
        <option value="-6">(UTC-06:00) Central America</li>
        <option value="-6">(UTC-06:00) Guadalajara, Mexico City, Monterrey</li>
        <option value="-5">(UTC-05:00) Cancun</li>
        <option value="-6">(UTC-06:00) Saskatchewan</li>
        <option value="-5">(UTC-05:00) Bogota, Lima, Quito</li>
        <option value="-5">(UTC-05:00) Indiana (East)</li>
        <option value="-4">(UTC-04:00) Caracas</li>
        <option value="-3">(UTC-03:00) Asuncion</li>
        <option value="-4">(UTC-04:00) Atlantic Time (Canada)</li>
        <option value="-4">(UTC-04:00) Cuiaba</li>
        <option value="-4">(UTC-04:00) Georgetown, La Paz, Manaus, San Juan</li>
        <option value="-3">(UTC-03:00) Santiago</li>
        <option value="-3">(UTC-03:30) Newfoundland</li>
        <option value="-3">(UTC-03:00) Brasilia</li>
        <option value="-3">(UTC-03:00) Buenos Aires</li>
        <option value="-3">(UTC-03:00) Cayenne, Fortaleza</li>
        <option value="-3">(UTC-03:00) Greenland</li>
        <option value="-3">(UTC-03:00) Montevideo</li>
        <option value="-3">(UTC-03:00) Salvador</li>
        <option value="-2">(UTC-02:00) Fernando de Noronha</li>
        <option value="-4">(UTC-04:00) Mid-Atlantic</li>
        <option value="-1">(UTC-01:00) Azores</li>
        <option value="-1">(UTC-01:00) Cape Verde Is.</li>
        <option value="0">(UTC) Casablanca</li>
        <option value="0">(UTC) Dublin, Edinburgh, Lisbon, London</li>
        <option value="0">(UTC) Monrovia, Reykjavik</li>
        <option value="+1">(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</li>
        <option value="+1">(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</li>
        <option value="+1">(UTC+01:00) Brussels, Copenhagen, Madrid, Paris</li>
        <option value="+1">(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb</li>
        <option value="+1">(UTC+01:00) West Central Africa</li>
        <option value="+2">(UTC+02:00) Windhoek, Khartoum</li>
        <option value="+2">(UTC+02:00) Athens, Bucharest</li>
        <option value="+2">(UTC+02:00) Beirut</li>
        <option value="+2">(UTC+02:00) Cairo</li>
        <option value="+2">(UTC+02:00) Damascus</li>
        <option value="+2">(UTC+02:00) Eastern Europe</li>
        <option value="+2">(UTC+02:00) Harare, Pretoria</li>
        <option value="+2">(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</li>
        <option value="+3">(UTC+03:00) Istanbul</li>
        <option value="+2">(UTC+02:00) Jerusalem, Tel-Aviv</li>
        <option value="+2">(UTC+02:00) Tripoli</li>
        <option value="+2">(UTC+02:00) Amman</li>
        <option value="+3">(UTC+03:00) Baghdad</li>
        <option value="+2">(UTC+02:00) Kaliningrad</li>
        <option value="+3">(UTC+03:00) Kuwait, Riyadh</li>
        <option value="+3">(UTC+03:00) Nairobi</li>
        <option value="+3">(UTC+03:00) Moscow, St. Petersburg, Volgograd, Minsk</li>
        <option value="+4">(UTC+04:00) Samara, Ulyanovsk, Saratov</li>
        <option value="+3.5">(UTC+03:30) Tehran</li>
        <option value="+4">(UTC+04:00) Abu Dhabi, Muscat</li>
        <option value="+4">(UTC+04:00) Baku</li>
        <option value="+4">(UTC+04:00) Port Louis</li>
        <option value="+4">(UTC+04:00) Tbilisi</li>
        <option value="+4">(UTC+04:00) Yerevan</li>
        <option value="+4">(UTC+04:30) Kabul</li>
        <option value="+5">(UTC+05:00) Ashgabat, Tashkent</li>
        <option value="+5">(UTC+05:00) Islamabad, Karachi</li>
        <option value="+5.5">(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</li>
        <option value="+5.5">(UTC+05:30) Sri Jayawardenepura</li>
        <option value="+5.75">(UTC+05:45) Kathmandu</li>
        <option value="+6">(UTC+06:00) Nur-Sultan (Astana)</li>
        <option value="+6">(UTC+06:00) Dhaka</li>
        <option value="+5">(UTC+05:00) Ekaterinburg</li>
        <option value="+6.5">(UTC+06:30) Yangon (Rangoon)</li>
        <option value="+7">(UTC+07:00) Bangkok, Hanoi, Jakarta</li>
        <option value="+7">(UTC+07:00) Novosibirsk</li>
        <option value="+8">(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi</li>
        <option value="+6">(UTC+06:00) Omsk</li>
        <option value="+7">(UTC+07:00) Krasnoyarsk</li>
        <option value="+8">(UTC+08:00) Kuala Lumpur, Singapore</li>
        <option value="+8">(UTC+08:00) Taipei</li>
        <option value="+8">(UTC+08:00) Ulaanbaatar</li>
        <option value="+8">(UTC+08:00) Irkutsk</li>
        <option value="+8">(UTC+08:00) Perth</li>
        <option value="+9">(UTC+09:00) Osaka, Sapporo, Tokyo</li>
        <option value="+9">(UTC+09:00) Seoul</li>
        <option value="+10.5">(UTC+10:30) Adelaide</li>
        <option value="+9.5">(UTC+09:30) Darwin</li>
        <option value="+10">(UTC+11:00) Hobart</li>
        <option value="+9">(UTC+09:00) Yakutsk</li>
        <option value="+11">(UTC+11:00) Solomon Is., New Caledonia</li>
        <option value="+10">(UTC+10:00) Vladivostok</li>
        <option value="+13">(UTC+13:00) Auckland, Wellington</li>
        <option value="+13">(UTC+13:00) Fiji</li>
        <option value="+11">(UTC+11:00) Magadan</li>
        <option value="+12">(UTC+12:00) Petropavlovsk-Kamchatsky</li>
        <option value="+13">(UTC+13:00) Nuku'alofa</li>
        <option value="+14">(UTC+14:00) Samoa</li>
        </select>
    </p>`;

    const templateTimestamp = `
    <p class="align-center" style="margin:25px 0 5px"><span style="font-weight:600">or Unix Timestamp (UTC)</span></p>
    <p><input type="number" min="0" name="epoch" placeholder="timestamp value" class="timestamp"></p>
    `;

    dsjs.setFromMobile = (element) => {
        var value = '',
            componentType = element.attr('data-dsjs');

        if (componentType == 'date') {
            getNextNode(element.parentNode, 'input', 'dsjs').attr('data-value', element.value);
            return;
        }

        if (componentType == 'datetime') {
            // enforce min/max
            var originalElement = getNextNode(element.parentNode, 'input', 'dsjs');
            var minDate = Date.parse(originalElement.attr('dsjs-min')),
                maxDate = Date.parse(originalElement.attr('dsjs-max')),
                selectedDate = Date.parse(element.value);

            if (selectedDate < minDate) {
                selectedDate = minDate;
            }
            if (selectedDate > maxDate) {
                selectedDate = maxDate;
            }

            selectedDate = new Date(selectedDate);
            element.value = `${selectedDate.getFullYear()}-${zeroPad(selectedDate.getMonth() + 1, 2)}-${zeroPad(selectedDate.getDate(), 2)}T${zeroPad(selectedDate.getHours(), 2)}:${zeroPad(selectedDate.getMinutes(), 2)}`;
            getNextNode(element.parentNode, 'input', 'dsjs').attr('data-value', element.value+'+00:00');
        }

        if (componentType == 'daterange') {
            if (element.parentNode.querySelector('div')) {
                removeNode(element.parentNode.querySelector('div'));
            }
            var rangeStart = element.parentNode.querySelector('input:first-of-type'),
                rangeEnd = element.parentNode.querySelector('input:last-of-type');
            var start = rangeStart.value,
                end = rangeEnd.value;
            var startInt = parseInt(start.replaceAll('-', '')),
                endInt = parseInt(end.replaceAll('-', ''));

            if (startInt > endInt) {
                rangeStart.value = rangeStart.attr('data-value');
                rangeEnd.value = rangeEnd.attr('data-value');
                insertAfter(
                    '<div class="dsjs-error">Invalid range (start date should be before end date)</div>',
                    element.parentNode.querySelector('input:last-of-type'));
            }

            var originalElement = getNextNode(element.parentNode, 'input', 'dsjs');
            originalElement.attr('data-value', start + '~' + end);
            return;
        }
    };

    dsjs.init = (elements) => {
        elements = elements || document.querySelectorAll('.dsjs:not([datajs-init=true])');
        if (!NodeList.prototype.isPrototypeOf(elements)) {
            elements = [document.querySelector(elements)];
        }

        var os = getMobileOperatingSystem();
        var today = new Date();

        if (["Android", "iOS"].indexOf(os) === -1) {
            elements.forEach(function(element) {
                element.attr('datajs-init', 'true');
                element.attr('readonly', 'readonly');
                element.className = element.className.replace(' dsjs-input', '') + ' dsjs-input';
                element.addEventListener('click', showWidget);

                if (element.attr('dsjs-min').toLowerCase() == 'today') {
                    element.attr('dsjs-min', `${today.getUTCFullYear()}-${zeroPad(today.getUTCMonth()+1)}-${zeroPad(today.getUTCDate())}`);
                    if (element.attr('dsjs-type') == 'datetime') {
                        element.attr('dsjs-min', `${element.attr('dsjs-min')}T${zeroPad(today.getUTCHours())}:${zeroPad(today.getUTCMinutes())}:${zeroPad(today.getUTCSeconds())}+00:00`);
                    }
                }
                if (element.attr('dsjs-max').toLowerCase() == 'today') {
                    element.attr('dsjs-max', `${today.getUTCFullYear()}-${zeroPad(today.getUTCMonth()+1)}-${zeroPad(today.getUTCDate())}`);
                    if (element.attr('dsjs-type') == 'datetime') {
                        element.attr('dsjs-max', `${element.attr('dsjs-max')}T${zeroPad(today.getUTCHours())}:${zeroPad(today.getUTCMinutes())}:${zeroPad(today.getUTCSeconds())}+00:00`);
                    }
                }

                // add placeholder
                if (!element.attr('placeholder')) {
                    var date, componentValue, componentType = element.attr('dsjs-type');
                    var monthNames = (element.attr('dsjs-month-format') == 'full') ? fullMonthNames : shortMonthNames;

                    if (componentType == 'date') {
                        componentValue = element.attr('dsjs-date');
                        date = componentValue ? new Date(Date.parse(componentValue)) : new Date();
                        element.attr('placeholder', `${monthNames[date.getUTCMonth()+1]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`);
                    }
                    else if (componentType == 'daterange') {
                        componentValue = element.attr('dsjs-daterange-start') || element.attr('dsjs-daterange-min');
                        var start = componentValue ? new Date(Date.parse(componentValue)) : new Date();
                        componentValue = element.attr('dsjs-daterange-end') || element.attr('dsjs-daterange-max');
                        var end = componentValue ? new Date(Date.parse(componentValue)) : new Date();
                        element.attr('placeholder', `${monthNames[start.getUTCMonth()+1]} ${start.getUTCDate()}, ${start.getUTCFullYear()} - ${monthNames[end.getUTCMonth()+1]} ${end.getUTCDate()}, ${end.getUTCFullYear()}`);
                    }
                    else if (componentType == 'datetime') {
                        componentValue = element.attr('dsjs-datetime');
                        date = componentValue ? new Date(Date.parse(componentValue)) : new Date();

                        var hours = date.getUTCHours();
                        var minutes = date.getUTCMinutes();
                        hours = hours % 12;
                        var strTime = zeroPad(hours ? hours : 12) + ':' + zeroPad(minutes) + ':' + zeroPad(date.getUTCSeconds()) + ' ' + (hours >= 12 ? 'PM' : 'AM');
                        element.attr('placeholder', `${monthNames[date.getUTCMonth()+1]} ${date.getUTCDate()}, ${date.getUTCFullYear()} ${strTime} (UTC)`);
                    }
                }
            });
            return;
        }

        var nameCounter = 1;
        elements.forEach(function(element) {
            var component, componentType = element.attr('dsjs-type');

            var fieldName = 'dsjs-'+ zeroPad(nameCounter);
            nameCounter++;

            element.attr('datajs-init', 'true');
            // replace component with mobile native
            if (componentType === 'date' || componentType === 'daterange') {
                component = '<input type="date" data-dsjs="'+ componentType +'" name="_'+ fieldName +'" ';
                component += ' onchange="dsjs.setFromMobile(this);"';
                try {
                    component += ' min="'+ element.attr('dsjs-min').split('T')[0] +'" ';
                } catch(er) {}
                try {
                    component += ' max="'+ element.attr('dsjs-max').split('T')[0] +'" ';
                } catch(er) {}
                if (componentType === 'daterange') {
                    try {
                        component += ' value="'+ element.attr('dsjs-daterange-start').split('T')[0] +'" ';
                        component += ' data-value="'+ element.attr('dsjs-daterange-start').split('T')[0] +'" ';
                    } catch(er) {}
                } else {
                    try {
                        component += ' value="'+ element.attr('dsjs-date').split('T')[0] +'" ';
                        component += ' data-value="'+ element.attr('dsjs-date').split('T')[0] +'" ';
                    } catch(er) {}
                }
                component += '>';

                if (componentType === 'daterange') {
                    component += '<span> - </span><input type="date" data-dsjs="daterange" name="_'+ fieldName +'-end" ';
                    component += ' onchange="dsjs.setFromMobile(this);"';
                    try {
                        component += ' min="'+ element.attr('dsjs-min').split('T')[0] +'" ';
                    } catch(er) {}
                    try {
                        component += ' max="'+ element.attr('dsjs-max').split('T')[0] +'" ';
                    } catch(er) {}
                    try {
                        component += ' value="'+ element.attr('dsjs-daterange-end').split('T')[0] +'" ';
                        component += ' data-value="'+ element.attr('dsjs-daterange-end').split('T')[0] +'" ';
                    } catch(er) {}

                    component += '>';
                }
            }
            else if (componentType === 'datetime') {
                component = '<input type="datetime-local" data-dsjs="'+ componentType +'" name="_'+ fieldName +'" ';
                component += ' onchange="dsjs.setFromMobile(this);"';
                try {
                    component += ' min="'+ element.attr('dsjs-min') +'" ';
                } catch(er) {}
                try {
                    component += ' max="'+ element.attr('dsjs-max') +'" ';
                } catch(er) {}
                try {
                    var dt = new Date(Date.parse(element.attr('dsjs-datetime')));
                    dt = `${dt.getUTCFullYear()}-${zeroPad(dt.getUTCMonth()+1)}-${zeroPad(dt.getUTCDate())}T${zeroPad(dt.getUTCHours())}:${zeroPad(dt.getUTCMinutes())}`;
                    component += ' value="'+ dt +'" ';
                    component += ' data-value="'+ dt +'" ';
                } catch(er) {}

                component += '>';
            }

            // add mobile native component
            replaceComponent(element, component);
            return;
        });
    };

    const render = (element, container) => {
        dsjs.element = element;

        // use desktop components
        var monthNames = (element.attr('dsjs-month-format') == 'full') ? fullMonthNames : shortMonthNames;

        componentType = element.attr('dsjs-type');
        var template = templateWrapper;
        var innerTemplate = templateCalendar.replace('{{id}}', "start-date");

        if (componentType != 'datetime') {
            element.attr('dsjs-timezone', 'false');
            element.attr('dsjs-timestamp', 'false');
        }
        if (componentType == 'daterange') {
            innerTemplate += templateCalendar.replace('{{id}}', "end-date");;
            template = template.replace('{{header}}', 'Choose date range...');
        }
        else if (componentType == 'datetime') {
            innerTemplate += templateTime;
            template = template.replace('{{header}}', 'Choose date and time...');
            var timezone = (element.attr('dsjs-timezone') === 'true');
            if (timezone) {
                innerTemplate = innerTemplate.replace('{{timezone}}', templateTimezone);
            } else {
                innerTemplate = innerTemplate.replace('{{timezone}}', '');
            }
            var timestamp = (element.attr('dsjs-timestamp') === 'true');
            if (timestamp) {
                innerTemplate = innerTemplate.replace('{{timestamp}}', templateTimestamp);
            } else {
                innerTemplate = innerTemplate.replace('{{timestamp}}', '<p>&nbsp;</p>');
            }
        }
        else {
            template = template.replace('{{header}}', 'Choose date...');
        }

        template = template.replace('{{components}}', innerTemplate);

        // add year selector
        var minDate = new Date(Date.parse(element.attr('dsjs-min')));
        var maxDate = new Date(Date.parse(element.attr('dsjs-max')));
        var options = '';
        for (let year = minDate.getUTCFullYear(); year <= maxDate.getUTCFullYear(); year++) {
            options += '<option>'+ year +'</option>';
        }
        template = template.replaceAll('{{years}}', options);

        if (componentType == 'datetime' && element.attr('dsjs-timezone') == 'true') {
            template = template.replace('{{timezone}}', templateTimezone);
        }

        // populate html
        container.innerHTML = template;

        // limit epoch
        if (componentType == 'datetime' && element.attr('dsjs-timestamp') === 'true') {
            container.querySelector('[name=epoch]').attr('min', minDate.getTime()/1000);
            container.querySelector('[name=epoch]').attr('max', maxDate.getTime()/1000);
        }

        // slect date
        var selectedDate, table, year, month;

        if (componentType == 'date') {
            table = container.querySelector('.dsjs-calendar table');
            selectedDate = new Date(Date.parse(element.attr('dsjs-date')));
            month = selectedDate.getUTCMonth() + 1;
            year = selectedDate.getUTCFullYear();
            showCalendar(table, year, month, element.attr('dsjs-date'));
            setSelectValue(table.querySelector('.select-year'), year);
            setSelectValue(table.querySelector('.select-month'), month);
        }

        else if (componentType == 'daterange') {
            table = container.querySelector('.dsjs-calendar#start-date table');
            selectedDate = new Date(Date.parse(element.attr('dsjs-daterange-start')));
            month = selectedDate.getUTCMonth() + 1;
            year = selectedDate.getUTCFullYear();
            showCalendar(table, year, month, element.attr('dsjs-daterange-start'));
            setSelectValue(table.querySelector('.select-year'), year);
            setSelectValue(table.querySelector('.select-month'), month);

            table = container.querySelector('.dsjs-calendar#end-date table');
            selectedDate = new Date(Date.parse(element.attr('dsjs-daterange-end')));
            month = selectedDate.getUTCMonth() + 1;
            year = selectedDate.getUTCFullYear();
            showCalendar(table, year, month, element.attr('dsjs-daterange-end'));
            setSelectValue(table.querySelector('.select-year'), year);
            setSelectValue(table.querySelector('.select-month'), month);
        }

        else if (componentType == 'datetime') {
            table = container.querySelector('.dsjs-calendar table');
            selectedDate = new Date(Date.parse(element.attr('dsjs-datetime')));
            month = selectedDate.getUTCMonth() + 1;
            year = selectedDate.getUTCFullYear();
            datetime = `${year}-${zeroPad(month)}-${zeroPad(selectedDate.getUTCDate())}`;
            showCalendar(table, year, month, datetime);
            setSelectValue(table.querySelector('.select-year'), year);
            setSelectValue(table.querySelector('.select-month'), month);

            // if (timezone) {
            //     innerTemplate = innerTemplate.replace('{{timezone}}', templateTimezone);
            // } else {
            //     innerTemplate = innerTemplate.replace('{{timezone}}', '');
            // }
            // if (timestamp) {
            //     innerTemplate = innerTemplate.replace('{{timestamp}}', templateTimestamp);
            // } else {
            //     innerTemplate = innerTemplate.replace('{{timestamp}}', '<p>&nbsp;</p>');
            // }

            if (timezone) {
                var epoch = Date.parse(element.attr('dsjs-datetime')) / 1000;
                var tz = element.attr('dsjs-datetime').split(/\+|-/).pop().split(':');
                if (tz.length == 2) {
                    var tzOffset = parseInt(tz[0]) +'.'+ (tz[1]/60).toString().replace('0.', '');
                    tzOffset = parseFloat(tzOffset, 10);
                    if (element.attr('dsjs-datetime').indexOf("+") === -1) {
                        tzOffset = -tzOffset;
                    }
                    epoch += (tzOffset * 3600);
                    setSelectValue(container.querySelector('.utc-offset'), tzOffset);
                    container.querySelector('.utc-offset').value = tzOffset;
                }
                setDateTimeFromEpoch(container, epoch);
                container.querySelector('input[name=epoch]').value = '';
            }
        }

        container.querySelectorAll('select:not(.chevron)').forEach(function(select) {
            setSelectWidth(select);
            setSelectWidth(select);
        });

        container.querySelector('.dsjs-widget').style.visibility = 'visible';

        if (componentType == 'date') {
            container.querySelector('tbody').addEventListener('click', function(event){
                event.preventDefault();
                if (event.target.tagName == 'BUTTON') {
                    element.className = element.className.replace('invalid', '').replace('valid', '');

                    // min/max dates
                    var selectedDate = parseInt(event.target.attr('data-date'));
                    if (selectedDate < dateAsInt(minDate)) {
                        selectedDate = dateAsInt(minDate);
                    }
                    if (selectedDate > dateAsInt(maxDate)) {
                        selectedDate = dateAsInt(maxDate);
                    }

                    var btnDate = selectedDate.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
                    var btnData = btnDate.split('-');
                    element.attr('dsjs-date', btnDate);

                    element.value = `${monthNames[btnData[1]]} ${btnData[2]}, ${btnData[0]}`;
                    element.attr('data-value', `${btnData[0]}-${btnData[1]}-${btnData[2]}`);
                    element.classList += ' valid';
                    removeNode(container);
                    element.attr('data-selected', 'true');
                }
            });
        }

        if (componentType == 'datetime') {
            // epoch input
            if (timestamp) {
                ['change', 'mouseup', 'blur', 'keyup'].forEach(evt => {
                    container.querySelector('input[name=epoch]').addEventListener(evt, function(event){
                        setDateTimeFromEpoch(container);
                        container.querySelector('button.primary').disabled = false;
                        return;
                    });
                });
                if (container.querySelector('input[name=epoch]').value !='' ) {
                    container.querySelector('button.primary').disabled = false;
                }
            }

            if (container.querySelector('button.selected')) {
                container.querySelector('button.primary').disabled = false;
            }

            dsjs.btnDate = element.attr('dsjs-datetime').split(' ')[0].split('T')[0];
            container.querySelector('tbody').addEventListener('click', function(event){
                event.preventDefault();
                if (event.target.tagName == 'BUTTON') {

                     // min/max dates
                     var selectedDate = parseInt(event.target.attr('data-date'));
                     if (selectedDate < dateAsInt(minDate)) {
                         selectedDate = dateAsInt(minDate);
                     }
                     if (selectedDate > dateAsInt(maxDate)) {
                         selectedDate = dateAsInt(maxDate);
                     }

                    dsjs.btnDate = selectedDate.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
                    getParent(event.target, 'tbody').querySelectorAll('button').forEach(function(btn) {
                        btn.className = btn.className.replace('selected', '').replace('highlighted', '');
                    });
                    event.target.classList += ' selected';
                    container.querySelector('button.primary').disabled = false;
                }
            });
            container.querySelector('button.primary').addEventListener('click', function(event){
                event.preventDefault();
                element.className = element.className.replace('invalid', '').replace('valid', '');
                container.querySelector('header').innerHTML = 'Choose date and time...';

                var btnData = dsjs.btnDate.split('-');
                var year = btnData[0],
                    month = btnData[1],
                    day = btnData[2],
                    hours = container.querySelector('input[name=hours]').value,
                    minutes = container.querySelector('input[name=minutes]').value,
                    seconds = container.querySelector('input[name=seconds]').value,
                    ampm = container.querySelector('.ampm').value.toUpperCase(),
                    utcOffset = container.querySelector('.utc-offset').value,
                    timezone = container.querySelector('.utc-offset'),
                    timestamp = container.querySelector('input[name=epoch]').value;

                timezone = timezone.options[timezone.selectedIndex].text.split(')')[0].split('(')[1];
                if (timezone !== 'UTC') {
                    timezone = timezone.replace('UTC', '');
                }

                if (day == 0) {
                    container.querySelector('header').innerHTML = '<span style="font-weight:500;color:#df3a3a">Invalid date/time (no day selected)</span>';
                    element.classList += ' invalid';
                }

                var hour24 = hours % 12;
                hour24 = hour24 ? hour24 : 12;
                if (hour24 == 24) hour24 = 0;

                var datetime = `${year}-${zeroPad(month)}-${zeroPad(day)}T${zeroPad(hour24)}:${zeroPad(minutes)}:${zeroPad(seconds)}${decimal2tzOffset(utcOffset)}`;
                element.attr('dsjs-datetime', datetime);
                container.querySelector('input[name=epoch]').value = Date.parse(datetime)/1000;
                element.value = `${monthNames[month]} ${zeroPad(day)}, ${year} @ ${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)} ${ampm} (${timezone})`;

                element.attr('data-value', `${year}-${month}-${day}T${zeroPad(hour24)}:${zeroPad(minutes)}:${zeroPad(seconds)}${decimal2tzOffset(utcOffset)}`);
                element.classList += ' valid';
                removeNode(container);
                element.attr('data-selected', 'true');
            });
        }

        if (componentType == 'daterange') {
            dsjs.startDate = dsjs.endDate = {
                year: '',
                month: '',
                day: '',
                asInt: 0,
                formatted: '...'
            };

            container.querySelector('.dsjs-calendar#start-date tbody').addEventListener('click', function(event){
                event.preventDefault();
                if (event.target.tagName == 'BUTTON') {
                    getParent(event.target, 'tbody').querySelectorAll('button').forEach(function(btn) {
                        btn.className = btn.className.replace('selected', '').replace('highlighted', '');
                    });

                    // min/max dates
                    var selectedDate = parseInt(event.target.attr('data-date'));
                    if (selectedDate < dateAsInt(minDate)) {
                        selectedDate = dateAsInt(minDate);
                    }
                    if (selectedDate > dateAsInt(maxDate)) {
                        selectedDate = dateAsInt(maxDate);
                    }

                    var theButton = getParent(event.target, 'tbody').querySelector('button[data-date="'+selectedDate+'"]');
                    theButton.classList += ' selected';

                    var startDate = new Date(Date.parse(selectedDate.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')));
                    dsjs.startDate = {
                        year: startDate.getUTCFullYear(),
                        month: startDate.getUTCMonth()+1,
                        day: startDate.getUTCDate(),
                    };
                    dsjs.startDate.asInt = parseInt(container.querySelector('#start-date button.selected').innerText);
                    dsjs.startDate.formatted = `${monthNames[dsjs.startDate.month]} ${dsjs.startDate.day}, ${dsjs.startDate.year}`;
                    setDateRange(dsjs.startDate, dsjs.endDate, element, container);
                }
            });
            container.querySelector('.dsjs-calendar#end-date tbody').addEventListener('click', function(event){
                event.preventDefault();
                if (event.target.tagName == 'BUTTON') {
                    getParent(event.target, 'tbody').querySelectorAll('button').forEach(function(btn) {
                        btn.className = btn.className.replace('selected', '').replace('highlighted', '');
                    });

                    // min/max dates
                    var selectedDate = parseInt(event.target.attr('data-date'));
                    if (selectedDate < dateAsInt(minDate)) {
                        selectedDate = dateAsInt(minDate);
                    }
                    if (selectedDate > dateAsInt(maxDate)) {
                        selectedDate = dateAsInt(maxDate);
                    }

                    var theButton = getParent(event.target, 'tbody').querySelector('button[data-date="'+selectedDate+'"]');
                    theButton.classList += ' selected';

                    var endDate = new Date(Date.parse(selectedDate.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')));
                    dsjs.endDate = {
                        year: endDate.getUTCFullYear(),
                        month: endDate.getUTCMonth()+1,
                        day: endDate.getUTCDate(),
                    };
                    dsjs.endDate.asInt = parseInt(container.querySelector('#end-date button.selected').innerText);
                    dsjs.endDate.formatted = `${monthNames[dsjs.endDate.month]} ${dsjs.endDate.day}, ${dsjs.endDate.year}`;
                    setDateRange(dsjs.startDate, dsjs.endDate, element, container);
                }
            });
            element.attr('data-selected', 'true');
        }

        document.addEventListener('mouseup', function(event){
            var targetElement = event.target;
            var widget = targetElement.parentNode.querySelector('div.dsjs-widget');
            if (!widget) return;
            do {
                if (targetElement == container || targetElement == element) {
                    return;
                }
                targetElement = targetElement.parentNode;
            } while (targetElement);
            try {
                removeNode(container);
            } catch(er){}
        });
    };

    const setDateRange = (start, end, element, container) => {
        container.querySelector('header').innerHTML = 'Choose date range...';
        element.className = element.className.replace('invalid', '').replace('valid', '');

        var startInt = parseInt(`${start.year}${zeroPad(start.month)}${zeroPad(start.day)}`),
            endInt = parseInt(`${end.year}${zeroPad(end.month)}${zeroPad(end.day)}`);

        if (start.formatted == '...' || end.formatted == '...') {
            return;
        }
        element.value = start.formatted + ' - ' + end.formatted;
        element.attr('data-value', `${start.year}-${zeroPad(start.month)}-${zeroPad(start.day)}~${end.year}-${zeroPad(end.month)}-${zeroPad(end.day)}`);
        element.attr('data-daterange', element.attr('data-value'));

        if (startInt > endInt) {
            container.querySelector('header').innerHTML = '<span style="font-weight:500;color:#df3a3a">Invalid range (start date should be before end date)</span>';
            element.classList += ' invalid';
            element.value = '... – ...';

            container.querySelectorAll('button').forEach(function(btn) {
                btn.className = btn.className.replace('selected', '').replace('highlighted', '');
                btn.blur();
            });
            dsjs.startDate = dsjs.endDate = {
                year: '',
                month: '',
                day: '',
                asInt: 0,
                formatted: '...'
            };
            return;
        }
        if (!isNaN(startInt)) {
            element.attr('dsjs-daterange-start', `${start.year}-${zeroPad(start.month)}-${zeroPad(start.day)}`);
        }
        if (!isNaN(endInt)) {
            element.attr('dsjs-daterange-end', `${end.year}-${zeroPad(end.month)}-${zeroPad(end.day)}`);
        }
        element.classList += ' valid';
        removeNode(container);
    };

    const setDateTimeFromEpoch = (container, epoch) => {
        epoch = epoch || container.querySelector('input[name=epoch]').value;
        if (epoch == '') {
            return;
        }
        if (epoch.toString().length == 13)  epoch = epoch / 1000;
        if (epoch < 0) epoch = 0;
        container.querySelector('input[name=epoch]').value = epoch;
        var datetime = new Date(0);
        datetime.setUTCSeconds(epoch);

        container.querySelector('.select-year').value = datetime.getUTCFullYear();
        container.querySelector('.select-month').value = datetime.getUTCMonth()+1;
        container.querySelector('input[name=minutes]').value = zeroPad(datetime.getUTCMinutes());
        container.querySelector('input[name=seconds]').value = zeroPad(datetime.getUTCSeconds());
        var hours = datetime.getUTCHours();
        var ampm = hours > 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;

        container.querySelector('input[name=hours]').value = hours ? zeroPad(hours) : 12;
        container.querySelector('.ampm').value = ampm.toLowerCase();
        container.querySelector('.utc-offset').value = '0';

        setSelectWidth(container.querySelector('.select-year'));
        setSelectWidth(container.querySelector('.select-month'));
        setSelectWidth(container.querySelector('.utc-offset'));
    };

    const showWidget = (e) => {
        e.preventDefault();
        var element = e.target;

        var widget = element.parentNode.querySelector('div.dsjs-widget');
        if (widget) {
            removeNode(widget.parentNode);
            return;
        }

        var div = document.createElement('div');
        div.style.id = 'dsjs-active';
        div.style.position = 'absolute';
        insertAfter(div, element);

        // get body height before adding our widget for position adjustments
        var body = document.body, html = document.documentElement;
        var bodyHeight = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

        // render widget
        render(element, div);

        // adjust position
        var widgetHeight = document.querySelector('.dsjs-wrapper').parentNode.offsetHeight,
            widgetBottomEdge = widgetHeight + document.querySelector('.dsjs-wrapper').parentNode.offsetTop;
            if (widgetBottomEdge > bodyHeight) {
                var wrapper = document.querySelector('.dsjs-wrapper').parentNode,
                    elementOffset = getPrevNode(wrapper, 'input', 'dsjs').offsetTop;
                // check if we have room above the element
                var placeAbove = elementOffset - widgetHeight;
                if (placeAbove < 0) return;
                wrapper.style.top = placeAbove+'px';
            }
    };

    const showCalendar = (wrapper, year, month, highlight) => {
        wrapper = wrapper || document;
        month = month || wrapper.querySelector('.select-month').value;
        year = year || wrapper.querySelector('.select-year').value;

        var element = dsjs.element;
        var minDate = element.attr('dsjs-min') || '1970-01-01',
            maxDate = element.attr('dsjs-max') || '2038-01-19',
            className = element.attr('data-selected') ? 'selected' : 'highlighted';

        var data = {
            days: new Date(year, month, 0).getDate(),
            start: new Date(year, month-1, 1).getDay(),
            prev_month_days: new Date(year, month-1, 0).getDate()
        };


        var cal = [], prev_month_days_shown = 0;
        if (data.start != 1) {
            for (let i = data.prev_month_days-data.start+2; i <= data.prev_month_days; i++) {
                cal.push([i, "faded"]);
                prev_month_days_shown++;
            }
        }
        for (let i = 1; i <= data.days; i++) {
            if (`${year}-${zeroPad(month)}-${zeroPad(i)}` == highlight) {
                cal.push([i, className]);
            } else {
                cal.push([i, ""]);
            }
        }

        var dateInt, html = '<tr>', i = 1, nm = 1;
        cal.forEach(btn => {
            if (btn[1] == "faded") {
                var intYear = year, intMonth = month-1;
                if (intMonth < 1) {
                    intMonth = 12;
                    intYear--;
                }
                dateInt = `${intYear}${zeroPad(intMonth)}${zeroPad(btn[0])}`;
            } else {
                dateInt = `${year}${zeroPad(month)}${zeroPad(btn[0])}`;
            }
            html += '<td><button data-date="'+ dateInt +'" class="'+ btn[1] +'">' + btn[0] + '</button></td>';
            if (i > 6) {
                html += '</tr><tr>';
                i = 0;
            }
            i++;
        });

        var nextYear = year, nextMonth = month+1;
        if (nextMonth > 12) {
            nextMonth = 1;
            nextYear++;
        }
        if (i > 1 && i < 8) {
            while (i <= 7) {
                dateInt = `${nextYear}${zeroPad(nextMonth)}${zeroPad(nm)}`;
                html += '<td><button data-date="'+ dateInt +'" class="faded">' + nm + '</button></td>';
                i++;
                nm++;
            }
        }
        html += '</tr>';

        wrapper.querySelector('tbody').innerHTML = html;
        wrapper.querySelector('.select-month').value = month;
        wrapper.querySelector('.select-year').value = year;


        // disable buttons?
        var buttons = wrapper.querySelectorAll('tbody button');
        minDate = minDate.split('-');
        if (minDate[0] == year && minDate[1] == month) {
            for (let i = 0; i < parseInt(minDate[2])+prev_month_days_shown; i++) {
                buttons[i].disabled = 'disabled';
            }
        }

        maxDate = maxDate.split('-');
        if (maxDate[0] == year && maxDate[1] == month) {
            for (let i = parseInt(maxDate[2])+prev_month_days_shown; i < buttons.length; i++) {
                buttons[i].disabled = 'disabled';
            }
        }

        // buttons bridge?
        // if (componentType == 'daterange') {
        //     minDate = element.attr('dsjs-daterange-start').split('-') || '1970-01-01';
        //     maxDate = element.attr('dsjs-daterange-end').split('-') || '2038-01-19';

        //     var startDate = (dsjs.startDate) ? dsjs.startDate.asInt : parseInt(`${minDate[0]}${zeroPad(minDate[1])}${zeroPad(minDate[2])}`);;
        //     var endDate = (dsjs.endDate) ? dsjs.endDate.asInt : parseInt(`${maxDate[0]}${zeroPad(maxDate[1])}${zeroPad(maxDate[2])}`);

        //     wrapper.querySelector('tbody td[data-date="'+ startDate +'"]').classList += ' selected-start';
        //     wrapper.querySelector('tbody td[data-date="'+ endDate +'"]').classList += ' selected-end';
        //     var cells = wrapper.querySelectorAll('tbody td');
        //     cells.forEach(cell => {
        //         var cellDate = parseInt(cell.attr('data-date'))
        //         if (cellDate > startDate && cellDate < endDate) {
        //             cell.classList += ' in-range';
        //         }
        //     });
        // }

        setSelectWidth(wrapper.querySelector('.select-year'));
        setSelectWidth(wrapper.querySelector('.select-month'));
    };

    const setSelectWidth = (sel, extra_chars) => {
        var value = sel.options[sel.selectedIndex].text;
        sel.title = value;
        if (extra_chars !== undefined) {
            for (let i = 0; i < extra_chars; i++) {
                value += '.';
            }
        }
        var parent = getParent(sel, 'div', 'dsjs-widget');
        parent.querySelector('#dsjs-template').attr('style', 'display:block');
        parent.querySelector('#dsjs-template-option').innerText = value;
        sel.style.width = (parent.querySelector('#dsjs-template').offsetWidth * 1.02) + "px";
        parent.querySelector('#dsjs-template').attr('style', 'display:none');
    };

    dsjs.renderCalendar = (element) => {
        var wrapper = getParent(element, 'table');
        var month = parseInt(wrapper.querySelector('.select-month').value);
        var year = parseInt(wrapper.querySelector('.select-year').value);
        showCalendar(wrapper, year, month);
    };

    dsjs.nextMonth = (element) => {
        var wrapper = getParent(element, 'table');
        var nextMonth = parseInt(wrapper.querySelector('.select-month').value);
        var nextYear = wrapper.querySelector('.select-year').value;
        nextMonth++;
        if (nextMonth > 12) {
            nextMonth = 1;
            nextYear++;
        }
        showCalendar(wrapper, nextYear, nextMonth);
    };

    dsjs.prevMonth = (element) => {
        var wrapper = getParent(element, 'table');
        var nextMonth = parseInt(wrapper.querySelector('.select-month').value);
        var nextYear = parseInt(wrapper.querySelector('.select-year').value);
        nextMonth--;
        if (nextMonth < 1) {
            nextMonth = 12;
            nextYear--;
        }
        showCalendar(wrapper, nextYear, nextMonth);
    };

    dsjs.setValues = () => {
        document.querySelectorAll('.dsjs').forEach((ele) => {
            ele.value = ele.attr('data-value');
        });
    };

    // --- utility functions ---

    HTMLElement.prototype.attr = function(key, value) {
        if (value === undefined) {
            return this.getAttribute(key);
        }
        this.setAttribute(key, value);
        return value;
    };

    const zeroPad = (val) => {
        val = parseInt(val);
        return (val < 10) ? '0' + val : val;
    };

    const insertAfter = (newNode, referenceNode) => {
        if (typeof(newNode) == 'string') {
            var wrapper = document.createElement('span');
            wrapper.innerHTML = newNode;
            newNode = wrapper;
        }
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    };

    const replaceComponent = (el, str) => {
        var wrapper = document.createElement('span');
        wrapper.attr('class', 'dsjs-'+ el.attr('dsjs-type'));
        wrapper.innerHTML = str;
        el.style.display = 'none';
        el.parentNode.insertBefore(wrapper, el);

        // var children = Array.from(wrapper.children)
        // for (let i = 0; i < children.length; i++) {
        //     const child = children[i];
        //     console.log(child);
        //     el.parentNode.insertBefore(child, el);
        // }
    };

    const getMobileOperatingSystem = () => {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }

        return "unknown";
    };

    const setSelectValue = (sel, val) => {
        var opts = sel.options;
        for (var opt, j = 0; opt = opts[j]; j++) {
            if (opt.value == val) {
                sel.selectedIndex = j;
                break;
            }
        }
    };

    const getParent = (ele, parentType, className) => {
        while (true) {
            ele = ele.parentNode;
            if (ele.tagName.toLowerCase() == parentType.toLowerCase()) {
                if (className) {
                    if (ele.classList.contains(className)) {
                        return ele;
                    }
                } else {
                    return ele;
                }
            }
        }
        return document.body;
    };

    const getPrevNode = (element, parentType, className) => {
        var prev = element.previousElementSibling;
        while (true) {
            if (prev.tagName.toLowerCase() == parentType.toLowerCase()) {
                if (className) {
                    if (prev.classList.contains(className)) {
                        return prev;
                    }
                } else {
                    return prev;
                }
            }
        }
    };
    const getNextNode = (element, parentType, className) => {
        var next = element.nextElementSibling;
        while (true) {
            if (next.tagName.toLowerCase() == parentType.toLowerCase()) {
                if (className) {
                    if (next.classList.contains(className)) {
                        return next;
                    }
                } else {
                    return next;
                }
            }
        }
    };

    const removeNode = (element) => {
        element.parentNode.removeChild(element);
    };

    const dateAsInt = (date) => {
        return parseInt(date.getUTCFullYear() +''+ zeroPad(date.getUTCMonth() + 1) +''+ zeroPad(date.getUTCDate()));
    };


    const decimal2tzOffset = (utcOffset) => {
        if (utcOffset == 0) {
          return "+00:00";
        }
        utcOffset = utcOffset.toString();
        var hours = utcOffset.split('.')[0];
        var symbol = (hours.slice(0, 1) == '-') ? '-' : '+';
        hours = zeroPad(hours.replace(/[^0-9]/g, ''));
        var minutes = {
            "0": "00",
            "5": "30",
            "25": "15",
            "75": "45",
        }[utcOffset.split('.')[1]];

        return symbol+hours+':'+ minutes;
    };


}(window.dsjs = window.dsjs || {}));

