# DateSelect.js

**DateSelect.js** (`dsjs` for short) is a minimalistic Javascript date selector.

### Features:

- Small (7 KB minified and gzipped)
- Options for a date selector, a date-time selector, and a date-rage selector
- Supports light/dark modes (add `class="dark"` to the `body` or `html` tags)
- Default to native elements on mobile
- Pure javascript = no dependencies
- Pretty :)


## Examples

#### Date selector
<img src="https://github.com/tradologics/dateselect.js/blob/main/gifs/date.gif" height="300">

#### Date-time selector
<img src="https://github.com/tradologics/dateselect.js/blob/main/datetime.gif" height="300">

#### Date-range selector
<img src="https://github.com/tradologics/dateselect.js/blob/main/daterange.gif" height="300">

---

## How to use:
```html
<!-- place a text element with the dsjs class and dsjs attributes -->
<input class="dsjs"
    dsjs-type="date"
    dsjs-min="2010-01-01"
    dsjs-max="today"
    dsjs-date="2021-10-13"
    dsjs-month-format="full"
></input>

<!-- add these css and js files to the site's footer -->
<link rel="stylesheet" type="text/css" href="/path/to/dateselect.min.css" media="all">
<script src="/path/to/dateselect.min.js" onload="dsjs.init();"></script>
```

That's it!

> **NOTE:** To render new/dynamic elements, simply call `dsjs.init();`

### Where data is stored?

The selected date/time/range will be saved in the `data-value` attribute of the original input element, so you might need to replace the input's `value` with the `data-value` value before submitting the form.

**The data is stored in the following formats:**

- Date: `YYYY-MM-DD` (i.e. `2019-04-22`)
- Date-time: `YYYY-MM-DDTHH:SS:II±TZ` (i.e. `2019-04-22T00:00:00+00:00`)
- Date-range: `YYYY-MM-DD~YYYY-MM-DD` (i.e. `2019-04-22~2019-12-31`)


## Supported `dsjs-*` attributes

### Date selector

Input format: `YYYY-MM-DD`<br>
Example: `2019-04-22`

- `dsjs-type` - Mandatory value is `date`!
- `dsjs-month-format` - Use `full` or `short` month names (Optional)
- `dsjs-min` - minimum date allowed, in `<input-format>` (Optional)
- `dsjs-max` - minimum date allowed, in `<input-format>` (Optional)
- `dsjs-date` - default date to select, in `<input-format>` (Optional)

### Date-time selector

Input format: `YYYY-MM-DDTHH:II[:SS][±TZ]`<br>
Example: `2019-04-22T00:00:00+00:00`

- `dsjs-type` - Mandatory value is `datetime`!
- `dsjs-month-format` - Use `full` or `short` month names (Optional)
- `dsjs-min` - minimum date allowed, in `<input-format>` (Optional)
- `dsjs-max` - minimum date allowed, in `<input-format>` (Optional) (Optional)
- `dsjs-datetime ` - default date to select, in `<input-format>` (Optional)
- `dsjs-timezone` - Show the timezone selector? (`true/false`, Optional)
- `dsjs-timestamp` - Allow timestamp input? (`true/false`, Optional)


### Date-range selector

Input format: `YYYY-MM-DD`<br>
Example: `2019-04-22`

- `dsjs-type` - Mandatory value is `daterange`!
- `dsjs-month-format` - Use `full` or `short` month names (Optional)
- `dsjs-min` - minimum date allowed, in `<input-format>` (Optional)
- `dsjs-max` - minimum date allowed, in `<input-format>` (Optional)
- `dsjs-daterange-start` - default start date to select, in `<input-format>` (Optional)
- `dsjs-daterange-end` - default end date to select, in `<input-format>` (Optional)


#### NOTE:

The `dsjs-min` and `dsjs-max` also accepts `today` as the value.
