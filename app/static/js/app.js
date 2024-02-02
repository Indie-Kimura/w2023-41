// import { React } from 'react/client';
import { createRoot } from 'react-dom/client';
// import { DatePicker } from 'react-datepicker';

function PDFform() {
    return (

        <div class="row row-4">
            <div class="col-sm-12">
                <div class="files-upload-zone" template="/static/templates/weko_items_ui/upload.html"><div class="well" ngf-drag-over-class="'dragover'">
                    <center>
                        Drop pdf here
                    </center>
                </div>
                    <p class="text-center legend"><strong>— OR —</strong></p>
                    <p class="text-center">
                        <button class="btn btn-primary" ngf-max-size="20GB" ngf-multiple="true" ngf-select="" ngf-change="hookAddFiles($files)">
                            Click to select for pdf
                        </button>
                    </p></div>
                <p class="text-center">
                    <button class="btn btn-success">
                        <span class="glyphicon glyphicon-plus"></span>&nbsp;
                        PDFからメタデータの自動入力
                    </button>
                </p>
            </div>
        </div>
    )
}

function FileUploadForm() {
    return (

        <div class="row row-4">
            <div class="col-sm-12">
                <div class="files-upload-zone" template="/static/templates/weko_items_ui/upload.html"><div class="well" ngf-drag-over-class="'dragover'">
                    <center>
                        Drop file or folders here
                    </center>
                </div>
                    <p class="text-center legend"><strong>— OR —</strong></p>
                    <p class="text-center">
                        <button class="btn btn-primary" ngf-max-size="20GB" ngf-multiple="true" ngf-select="" ngf-change="hookAddFiles($files)">
                            Click to select
                        </button>
                    </p></div>
            </div>
        </div>
    )
}

function togglepanel(element) {
    // ボタンの親を取得
    var parent = element.parentNode;

    // ボタンのHTMLを取得
    if (parent.lastElementChild.classList.contains('hidden')) {
        parent.lastElementChild.classList.remove('hidden');
    } else {
        parent.lastElementChild.classList.add('hidden');
    }
}

function Titleform({ title }) {
    //onClick="togglepanel()"などでタイトルをクリックするとたためるようにする予定
    return (
        <div class="panel-heading"><a class="panel-toggle">
            {title}
        </a>
        </div>
    );
}

function Metadatatitle({ title, metadatakey }) {
    var required = false;
    var keylist;
    var classvalue;
    keylist = metadatakey.split(".");
    keylist.forEach(element => {
        //このreplaceよくない気がする直す可能性あり
        element = element.replace("[]", "")
        if (schema.required.includes(element)) {
            required = true;
        }
    })
    if (required) {
        classvalue = "col-sm-3 control-label field-required";
    } else {
        classvalue = "col-sm-3 control-label";
    }
    return (
        <label class={classvalue}>
            {title}
        </label>
    )
}

function Textform({ metadatatitle, value, order, item }) {
    var readonly = false;
    if ("readonly" in item && item.readonly == true) {
        readonly = true;
    }
    return (
        <div class="form-group schema-form-textarea">
            <Metadatatitle title={metadatatitle} metadatakey={item.key} />
            <div class="col-sm-9">
                <input type="text"
                    class="form-control"
                    id={item.key}
                    schema-validate="form"
                    defaultValue={value}
                    disabled={readonly}
                ></input>
            </div>
        </div>
    );
}

function Textareaform({ metadatatitle, value, order, item }) {
    return (
        <div class="form-group schema-form-textarea">
            <Metadatatitle title={metadatatitle} metadatakey={item.key} />
            <div class="col-sm-9">
                <textarea class="form-control"
                    id={item.key}
                    id_order={order}
                    schema-validate="form"
                    defaultValue={value}></textarea>
            </div>
        </div>
    );
}


function Selectform({ metadatatitle, map, order, value, item }) {
    const titlemap = [];
    map.forEach(element => {
        titlemap.push(
            <option label={element.name} value={element.value}></option>
        );
    })
    //TODO 必須項目の場合は field-requiredをlabelのクラスにつける
    return (
        <div class="form-group schema-form-select">
            <Metadatatitle title={metadatatitle} metadatakey={item.key} />
            <div class="col-sm-9">
                <select sf-changed="form" class="form-control" schema-validate="form" id={item.key} defaultValue={value}>
                    <option class value="void"></option>
                    {titlemap}
                </select>
            </div>
        </div>

    )
}

function Radioform({ metadatatitle, map, order, value, item }) {
    const titlemap = [];
    map.forEach(element => {
        titlemap.push(
            <div class="radio">
                <label>
                    <input type="radio"
                        id={item.key}
                        value={element.value} />
                    <span ng-bind-html="item.name">{element.name_i18n.ja}</span>
                </label>
            </div >
        );
    })

    return (
        <div class="form-group schema-form-radios">
            <Metadatatitle title={metadatatitle} metadatakey={item.key} />
            <div class="col-sm-9">
                {titlemap}
            </div>
        </div>
    )
}

function Fieldsetform({ order, value, item }) {


}

// 実装できていない。いまはとりあえず　input型である。
function Datepickerform({ order, value, item }) {
    // const [selectedDate, setSelectedDate] = useState<Date>();
    var metadatatitle = ("title_i18n" in item) && ("ja" in item.title_i18n) ? item.title_i18n.ja : item.title;
    return (
        <div class="form-group schema-form-datepicker">
            <Metadatatitle title={metadatatitle} metadatakey={item.key} />

            <div class="col-sm-9">
                <input type="data"
                    class="form-control"
                    id={item.key}
                    schema-validate="form"
                    defaultValue={value}
                ></input>
            </div>
            {/* <DatePicker
                                dateFormat="yyyy-MM-dd"
                                locale="ja"
                                selected={selectedDate}
                                showTimeSelect
                                timeIntervals={30} /> */}
        </div>
    )
}

function Datelistform({ order, value, item }) {
    return (
        <Textform metadatatitle={("title_i18n" in item) && ("ja" in item.title_i18n) ? item.title_i18n.ja : item.title} value={""} order={order} item={item} />
    )
}

function Checkboxesform({ order, value, item }) {
    const titlemap = [];
    var metadatatitle = ("title_i18n" in item) && ("ja" in item.title_i18n) ? item.title_i18n.ja : item.title
    map = item.titleMap
    map.forEach(element => {
        titlemap.push(
            <label class="checkbox col-sm-4 checkbox-input">
                <input type="checkbox" class="touched" schema-vaidate="form" />
                <span style="overflow-wrap: break-word;">{element.name}</span>
            </label>
        );
    })
    return (
        <div class="form-group schema-form-select">
            <Metadatatitle title={metadatatitle} metadatakey={item.key} />
            <div class="col-sm-9">
                <div class="checkbox">
                    <select sf-changed="form" class="form-control" schema-validate="form" id_order={order} defaultValue={value}>
                        <option class value="void"></option>
                        {titlemap}
                    </select>
                </div>
            </div>
        </div>
    )
}

function HTMLpicker({ html }) {

    return (<div>{html}</div>);
}

function Panelform({ order, value, form }) {
    const input_field = [];
    var count = 0;
    if (!("items" in form)) {
        input_field.push(<Datepickerform order={count} item={form} />);
    } else {
        form.items.forEach(item => {
            if ("type" in item) {
                if (item.type === "text") {
                    input_field.push(
                        <Textform metadatatitle={("title_i18n" in item) && ("ja" in item.title_i18n) ? item.title_i18n.ja : item.title} value={""} order={order} item={item} />
                    );
                } else if (item.type === "textarea") {
                    input_field.push(
                        <Textareaform metadatatitle={("title_i18n" in item) && ("ja" in item.title_i18n) ? item.title_i18n.ja : item.title} map={item.titleMap} value={""} order={order} item={item} />
                    );
                } else if (item.type === "select") {
                    input_field.push(
                        <Selectform metadatatitle={("title_i18n" in item) && ("ja" in item.title_i18n) ? item.title_i18n.ja : item.title} map={item.titleMap} value={""} order={order} item={item} />
                    );
                } else if (item.type === "radios") {
                    input_field.push(
                        <Radioform metadatatitle={("title_i18n" in item) && ("ja" in item.title_i18n) ? item.title_i18n.ja : item.title} map={item.titleMap} value={""} order={order} item={item} />
                    );
                } else if (item.type === "fieldset") {
                    input_field.push(<Panelform form={item} order={count} />);
                } else if (item.type === "template") {
                    if ("templateUrl" in item) {
                        var template = item.templateUrl.split('/').pop()
                        if (template === "datepicker.html" || template === "datepicker_multi_format.html") {
                            input_field.push(<Datepickerform order={count} item={item} />);
                        } else if (template === "datalist.html") {
                            input_field.push(<Datelistform order={count} item={item} />);
                        } else if (template === "checkboxes.html") {
                            input_field.push(<Checkboxesform order={count} item={item} map={item.titleMap} />)
                        }
                    } else if ("template" in item) {
                        input_field.push(<div></div>);
                    }
                } else {
                    input_field.push(<div></div>);
                }

            } else {
                input_field.push(<Panelform title={("title_i18n" in item) && ("ja" in item.title_i18n) ? item.title_i18n.ja : item.title} form={item} order={count} />);
            }
        })
    };
    ;
    return (
        <fieldset class="schema-form-fieldset flexbox">
            <div class="panel panel-default deposit-panel">
                {/* ここからタイトル */}
                <Titleform title={("title_i18n" in form) && ("ja" in form.title_i18n) ? form.title_i18n.ja : form.title} />
                {/* ここまでタイトル */}
                <div class="panel-body panel-body2 list-group">
                    <div class="schema-form-array">
                        <div class="col-sm-12">
                            <li class="list-group-item ui-sortable">
                                <div class="list-group-item">
                                    {/* ここから入力欄 */}
                                    {input_field}
                                    {/* ここまで入力欄 */}
                                </div>
                            </li>
                        </div>
                        <div class="clearfix">
                            <button type="button" class="btn btn-success pull-right">
                                <i class="glyphicon glyphicon-plus"> New </i>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </fieldset >
    )
}
/**
 * Custom bs-datepicker.
 * Default bs-datepicker: just support one pattern for input.
 * Custom bs-datepicker: support validate three pattern.
 * Used way:
 *  templateUrl: /static/templates/weko_deposit/datepicker_multi_format.html
 *  customFormat: enter your pattern.
 *    if it none, pattern are yyyy-MM-dd, yyyy-MM, yyyy.
*/
var Pattern = {
    yyyy: '\\d{4}',
    MM: '(((0)[1-9])|((1)[0-2]))',
    dd: '([0-2][0-9]|(3)[0-1])',
    sep: '(-)'
}
var Format = {
    yyyyMMdd: '^(' + Pattern.yyyy + Pattern.sep +
        Pattern.MM + Pattern.sep + Pattern.dd + ')$',
    yyyyMM: '^(' + Pattern.yyyy + Pattern.sep + Pattern.MM + ')$',
    yyyy: '^(' + Pattern.yyyy + ')$',
}
var CustomBSDatePicker = {
    option: {
        element: undefined,
        defaultFormat: Format.yyyyMMdd + '|' + Format.yyyyMM + '|' + Format.yyyy,
        cls: 'multi_date_format'
    },
    /**
     * Clear validate status for this element.
    */
    init: function () {
        let $element = $(CustomBSDatePicker.option.element);
        let $this_parent = $element.parent().parent();
        $element.removeClass('ng-invalid ng-invalid-date ng-invalid-parse');
        $element.next().next().addClass('hide');
        $this_parent.removeClass('has-error');
    },
    /**
     * Get format from defined user on form schema.
     * If user don't defined, this pattern get default pattern.
     * Default pattern: option.defaultFormat.
     * @return {String} return pattern.
    */
    getPattern: function () {
        let def_pattern = CustomBSDatePicker.option.defaultFormat;
        let $element = $(CustomBSDatePicker.option.element);
        let pattern = $element.data('custom-format');
        return (pattern.length == 0) ? def_pattern : pattern;
    },
    /**
     * Check data input valid with defined pattern.
     * @return {Boolean} return true if value matched
    */
    isMatchRegex: function () {
        let $element = $(CustomBSDatePicker.option.element);
        let val = $element.val();
        let pattern = CustomBSDatePicker.getPattern();
        let reg = new RegExp(pattern);
        return reg.test(val);
    },
    /**
     * Check input required.
     * @return {Boolean} return true if input required
    */
    isRequired: function () {
        let $lement = $(CustomBSDatePicker.option.element);
        let $this_parent = $lement.parent().parent();
        let label = $this_parent.find('label');
        return label.hasClass('field-required');
    },
    /**
    * Get the number of days in any particular month
    * @param  {number} m The month (valid: 0-11)
    * @param  {number} y The year
    * @return {number}   The number of days in the month
    */
    daysInMonth: function (m, y) {
        switch (m) {
            case 1:
                return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
            case 8: case 3: case 5: case 10:
                return 30;
            default:
                return 31
        }
    },
    /**
    * Check if a date is valid
    * @param  {number}  d The day
    * @param  {number}  m The month
    * @param  {number}  y The year
    * @return {Boolean}   Returns true if valid
    */
    isValidDate: function (d, m, y) {
        let month = parseInt(m, 10) - 1;
        let checkMonth = month >= 0 && month < 12;
        let checkDay = d > 0 && d <= CustomBSDatePicker.daysInMonth(month, y);
        return checkMonth && checkDay;
    },
    /**
     * Check all validate for this.
     * All validation valid => return true.
     * @return {Boolean} Returns true if valid
    */
    isValidate: function () {
        let $element = $(CustomBSDatePicker.option.element);
        let val = $element.val();
        if (val.length == 0) {
            //Required input invalid.
            if (CustomBSDatePicker.isRequired()) return false;
        } else {
            //Data input is not match with defined pattern.
            if (!CustomBSDatePicker.isMatchRegex()) return false;
            //Check day by month and year.
            let arr = val.split('-');
            if (arr.length == 3 && !CustomBSDatePicker.isValidDate(arr[2], arr[1], arr[0])) return false;
        }
        return true;
    },
    /**
     * Check validate and apply css for this field.
    */
    validate: function () {
        let $element = $(CustomBSDatePicker.option.element);
        let $this_parent = $element.parent().parent();
        if (!CustomBSDatePicker.isValidate()) {
            $element.next().next().removeClass('hide');
            $this_parent.addClass('has-error');
        }
    },
    /**
     * This is mean function in order to validate.
     * @param {[type]} element date field
    */
    process: function (element) {
        CustomBSDatePicker.option.element = element;
        CustomBSDatePicker.init();
        CustomBSDatePicker.validate();
    },
    /**
    * Init attribute of model object if them undefine.
    * @param  {[object]}  model
    * @param  {[object]}  element is date input control.
    */
    initAttributeForModel: function (model, element) {
        if ($(element).val().length == 0) return;
        let ng_model = $(element).attr('ng-model').replace(/']/g, '');
        let arr = ng_model.split("['");
        //Init attribute of model object if them undefine.
        let str_code = '';
        $.each(arr, function (ind_01, val_02) {
            str_code += (ind_01 == 0) ? val_02 : "['" + val_02 + "']";
            let chk_str_code = '';
            if (ind_01 != arr.length - 1) {
                chk_str_code = "if(!" + str_code + ") " + str_code + "={};";
            }
            eval(chk_str_code);
        });
    },
    /**
    * Excute this function before 'Save' and 'Next' processing
    * Get data from fields in order to fill to model.
    * @param  {[object]}  model
    * @param  {[Boolean]}  reverse
    */
    setDataFromFieldToModel: function (model, reverse) {
        let cls = CustomBSDatePicker.option.cls;
        let element_arr = $('.' + cls);
        $.each(element_arr, function (ind, val) {
            CustomBSDatePicker.initAttributeForModel(model, val);
            if (reverse) {
                //Fill data from model to fields
                str_code = "$(val).val(" + $(val).attr('ng-model') + ")";
                try {
                    eval(str_code);
                } catch (e) {
                    // If the date on model is undefined, we can safetly ignore it.
                    if (!e instanceof TypeError) {
                        throw e;
                    }
                }
            } else {
                //Fill data from fields to model
                str_code = 'if ($(val).val().length != 0) {' + $(val).attr('ng-model') + '=$(val).val()}';
                eval(str_code);
            }
        });
    },
    /**
     * Get date fields name which invalid.
     * @return {array} Returns name list.
    */
    getInvalidFieldNameList: function () {
        let cls = CustomBSDatePicker.option.cls;
        let element_arr = $('.' + cls);
        let result = [];
        $.each(element_arr, function (ind, val) {
            let $element = $(val);
            let $parent = $element.parent().parent();
            if ($parent.hasClass('has-error')) {
                let name = $element.attr('name');
                let label = $("label[for=" + name + "]").text().trim();
                result.push(label);
            }
        });
        return result;
    },
    /**
     * If input empty, this attribute delete.
     * Fix bug: not enter data for date field.
    */
    removeLastAttr: function (model) {
        let cls = CustomBSDatePicker.option.cls;
        let element_arr = $('.' + cls);
        $.each(element_arr, function (ind, val) {
            if ($(val).val().length > 0) {
                CustomBSDatePicker.initAttributeForModel(model, val);
                let ng_model = $(val).attr('ng-model');
                let last_index = ng_model.lastIndexOf('[');
                let previous_attr = ng_model.substring(0, last_index);
                let str_code = "if(" + ng_model + "==''){" + previous_attr + "={}}";
                eval(str_code);
            }
        });
    }
}
const uploadpdf = createRoot(document.getElementById('upload_pdf_form_container'));
const uploadfile = createRoot(document.getElementById('upload_form_container'));
const root = createRoot(document.getElementById('input_form_container'));
const forms = [
    {
        "add": "New",
        "key": "item_1617605131499",
        "items": [
            {
                "key": "item_1617605131499[].filename",
                "type": "template",
                "title": "表示名",
                "onChange": "fileNameSelect(this, form, modelValue)",
                "titleMap": [],
                "title_i18n": {
                    "en": "FileName",
                    "ja": "表示名"
                },
                "templateUrl": "/static/templates/weko_deposit/datalist.html",
                "fieldHtmlClass": "file-name",
                "title_i18n_temp": {
                    "en": "FileName",
                    "ja": "表示名"
                }
            },
            {
                "key": "item_1617605131499[].url",
                "type": "fieldset",
                "items": [
                    {
                        "key": "item_1617605131499[].url.url",
                        "type": "text",
                        "title": "本文URL",
                        "feedback": false,
                        "title_i18n": {
                            "en": "Text URL",
                            "ja": "本文URL"
                        },
                        "fieldHtmlClass": "file-text-url",
                        "title_i18n_temp": {
                            "en": "Text URL",
                            "ja": "本文URL"
                        },
                        "disableSuccessState": true
                    },
                    {
                        "key": "item_1617605131499[].url.label",
                        "type": "text",
                        "title": "ラベル",
                        "feedback": false,
                        "title_i18n": {
                            "en": "Label",
                            "ja": "ラベル"
                        },
                        "title_i18n_temp": {
                            "en": "Label",
                            "ja": "ラベル"
                        },
                        "disableSuccessState": true
                    },
                    {
                        "key": "item_1617605131499[].url.objectType",
                        "type": "select",
                        "title": "オブジェクトタイプ",
                        "feedback": false,
                        "titleMap": [
                            {
                                "name": "abstract",
                                "value": "abstract"
                            },
                            {
                                "name": "summary",
                                "value": "summary"
                            },
                            {
                                "name": "fulltext",
                                "value": "fulltext"
                            },
                            {
                                "name": "thumbnail",
                                "value": "thumbnail"
                            },
                            {
                                "name": "other",
                                "value": "other"
                            }
                        ],
                        "title_i18n": {
                            "en": "Object Type",
                            "ja": "オブジェクトタイプ"
                        },
                        "title_i18n_temp": {
                            "en": "Object Type",
                            "ja": "オブジェクトタイプ"
                        },
                        "disableSuccessState": true
                    }
                ],
                "title": "本文URL",
                "title_i18n": {
                    "en": "Text URL",
                    "ja": "本文URL"
                },
                "title_i18n_temp": {
                    "en": "Text URL",
                    "ja": "本文URL"
                }
            },
            {
                "key": "item_1617605131499[].format",
                "type": "text",
                "title": "フォーマット",
                "title_i18n": {
                    "en": "Format",
                    "ja": "フォーマット"
                },
                "title_i18n_temp": {
                    "en": "Format",
                    "ja": "フォーマット"
                }
            },
            {
                "add": "New",
                "key": "item_1617605131499[].filesize",
                "items": [
                    {
                        "key": "item_1617605131499[].filesize[].value",
                        "type": "text",
                        "title": "サイズ",
                        "title_i18n": {
                            "en": "Size",
                            "ja": "サイズ"
                        },
                        "title_i18n_temp": {
                            "en": "Size",
                            "ja": "サイズ"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "サイズ",
                "title_i18n": {
                    "en": "Size",
                    "ja": "サイズ"
                },
                "title_i18n_temp": {
                    "en": "Size",
                    "ja": "サイズ"
                }
            },
            {
                "add": "New",
                "key": "item_1617605131499[].fileDate",
                "items": [
                    {
                        "key": "item_1617605131499[].fileDate[].fileDateType",
                        "type": "select",
                        "title": "日付タイプ",
                        "titleMap": [
                            {
                                "name": "Accepted",
                                "value": "Accepted"
                            },
                            {
                                "name": "Collected",
                                "value": "Collected"
                            },
                            {
                                "name": "Copyrighted",
                                "value": "Copyrighted"
                            },
                            {
                                "name": "Created",
                                "value": "Created"
                            },
                            {
                                "name": "Issued",
                                "value": "Issued"
                            },
                            {
                                "name": "Submitted",
                                "value": "Submitted"
                            },
                            {
                                "name": "Updated",
                                "value": "Updated"
                            },
                            {
                                "name": "Valid",
                                "value": "Valid"
                            }
                        ],
                        "title_i18n": {
                            "en": "Date Type",
                            "ja": "日付タイプ"
                        },
                        "title_i18n_temp": {
                            "en": "Date Type",
                            "ja": "日付タイプ"
                        }
                    },
                    {
                        "key": "item_1617605131499[].fileDate[].fileDateValue",
                        "type": "template",
                        "title": "日付",
                        "format": "yyyy-MM-dd",
                        "title_i18n": {
                            "en": "Date",
                            "ja": "日付"
                        },
                        "templateUrl": "/static/templates/weko_deposit/datepicker_multi_format.html",
                        "title_i18n_temp": {
                            "en": "Date",
                            "ja": "日付"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "日付",
                "title_i18n": {
                    "en": "Date",
                    "ja": "日付"
                },
                "title_i18n_temp": {
                    "en": "Date",
                    "ja": "日付"
                }
            },
            {
                "key": "item_1617605131499[].version",
                "type": "text",
                "title": "バージョン情報",
                "title_i18n": {
                    "en": "Version Information",
                    "ja": "バージョン情報"
                },
                "title_i18n_temp": {
                    "en": "Version Information",
                    "ja": "バージョン情報"
                }
            },
            {
                "key": "item_1617605131499[].displaytype",
                "type": "select",
                "title": "表示形式",
                "titleMap": [
                    {
                        "name": "詳細表示",
                        "value": "detail",
                        "name_i18n": {
                            "en": "Detail",
                            "ja": "詳細表示"
                        }
                    },
                    {
                        "name": "簡易表示",
                        "value": "simple",
                        "name_i18n": {
                            "en": "Simple",
                            "ja": "簡易表示"
                        }
                    },
                    {
                        "name": "プレビュー",
                        "value": "preview",
                        "name_i18n": {
                            "en": "Preview",
                            "ja": "プレビュー"
                        }
                    }
                ],
                "title_i18n": {
                    "en": "Preview",
                    "ja": "表示形式"
                },
                "title_i18n_temp": {
                    "en": "Preview",
                    "ja": "表示形式"
                }
            },
            {
                "key": "item_1617605131499[].licensetype",
                "type": "select",
                "title": "ライセンス",
                "titleMap": [],
                "title_i18n": {
                    "en": "License",
                    "ja": "ライセンス"
                },
                "title_i18n_temp": {
                    "en": "License",
                    "ja": "ライセンス"
                }
            },
            {
                "key": "item_1617605131499[].licensefree",
                "type": "textarea",
                "notitle": true,
                "condition": "model.item_1617605131499[arrayIndex].licensetype == 'license_free'",
                "title_i18n": {
                    "en": "自由ライセンス",
                    "ja": "自由ライセンス"
                }
            },
            {
                "type": "template",
                "title": "剽窃チェック",
                "template": "<div class='text-center' style='display:none;'><a class='btn btn-primary' href='/ezas/pdf-detect-weko.html' target='_blank' role='button'>{{ form.title }}</a></div>",
                "title_i18n": {
                    "en": "Check Plagiarism",
                    "ja": "剽窃チェック"
                }
            },
            {
                "key": "item_1617605131499[].accessrole",
                "type": "radios",
                "title": "アクセス",
                "onChange": "accessRoleChange()",
                "titleMap": [
                    {
                        "name": "オープンアクセス",
                        "value": "open_access",
                        "name_i18n": {
                            "en": "Open access",
                            "ja": "オープンアクセス"
                        }
                    },
                    {
                        "name": "オープンアクセス日を指定する",
                        "value": "open_date",
                        "name_i18n": {
                            "en": "Input Open Access Date",
                            "ja": "オープンアクセス日を指定する"
                        }
                    },
                    {
                        "name": "ログインユーザのみ",
                        "value": "open_login",
                        "name_i18n": {
                            "en": "Registered User Only",
                            "ja": "ログインユーザのみ"
                        }
                    },
                    {
                        "name": "公開しない",
                        "value": "open_no",
                        "name_i18n": {
                            "en": "Do not Publish",
                            "ja": "公開しない"
                        }
                    }
                ],
                "title_i18n": {
                    "en": "Access",
                    "ja": "アクセス"
                },
                "title_i18n_temp": {
                    "en": "Access",
                    "ja": "アクセス"
                }
            },
            {
                "key": "item_1617605131499[].date[0].dateValue",
                "type": "template",
                "title": "公開日",
                "format": "yyyy-MM-dd",
                "condition": "model.item_1617605131499[arrayIndex].accessrole == 'open_date'",
                "title_i18n": {
                    "en": "Opendate",
                    "ja": "公開日"
                },
                "templateUrl": "/static/templates/weko_deposit/datepicker.html"
            },
            {
                "key": "item_1617605131499[].groups",
                "type": "select",
                "title": "グループ",
                "titleMap": [],
                "condition": "model.item_1617605131499[arrayIndex].accessrole == 'open_login'",
                "title_i18n": {
                    "en": "Group",
                    "ja": "グループ"
                },
                "title_i18n_temp": {
                    "en": "Group",
                    "ja": "グループ"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "File",
        "title_i18n": {
            "en": "File",
            "ja": "ファイル情報"
        }
    },
    {
        "key": "pubdate",
        "type": "template",
        "title": "PubDate",
        "format": "yyyy-MM-dd",
        "required": true,
        "title_i18n": {
            "en": "PubDate",
            "ja": "公開日"
        },
        "templateUrl": "/static/templates/weko_deposit/datepicker.html"
    },
    {
        "add": "New",
        "key": "item_1617186331708",
        "items": [
            {
                "key": "item_1617186331708[].subitem_1551255647225",
                "type": "text",
                "title": "Title",
                "title_i18n": {
                    "en": "Title",
                    "ja": "タイトル"
                },
                "title_i18n_temp": {
                    "en": "Title",
                    "ja": "タイトル"
                }
            },
            {
                "key": "item_1617186331708[].subitem_1551255648112",
                "type": "select",
                "title": "Language",
                "titleMap": [
                    {
                        "name": "ja",
                        "value": "ja"
                    },
                    {
                        "name": "ja-Kana",
                        "value": "ja-Kana"
                    },
                    {
                        "name": "ja-Latn",
                        "value": "ja-Latn"
                    },
                    {
                        "name": "en",
                        "value": "en"
                    },
                    {
                        "name": "fr",
                        "value": "fr"
                    },
                    {
                        "name": "it",
                        "value": "it"
                    },
                    {
                        "name": "de",
                        "value": "de"
                    },
                    {
                        "name": "es",
                        "value": "es"
                    },
                    {
                        "name": "zh-cn",
                        "value": "zh-cn"
                    },
                    {
                        "name": "zh-tw",
                        "value": "zh-tw"
                    },
                    {
                        "name": "ru",
                        "value": "ru"
                    },
                    {
                        "name": "la",
                        "value": "la"
                    },
                    {
                        "name": "ms",
                        "value": "ms"
                    },
                    {
                        "name": "eo",
                        "value": "eo"
                    },
                    {
                        "name": "ar",
                        "value": "ar"
                    },
                    {
                        "name": "el",
                        "value": "el"
                    },
                    {
                        "name": "ko",
                        "value": "ko"
                    }
                ],
                "title_i18n": {
                    "en": "Language",
                    "ja": "言語"
                },
                "title_i18n_temp": {
                    "en": "Language",
                    "ja": "言語"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Title",
        "title_i18n": {
            "en": "Title",
            "ja": "タイトル"
        }
    },
    {
        "add": "New",
        "key": "item_1617186385884",
        "items": [
            {
                "key": "item_1617186385884[].subitem_1551255720400",
                "type": "text",
                "title": "Alternative Title",
                "title_i18n": {
                    "en": "Alternative Title",
                    "ja": "その他のタイトル"
                },
                "title_i18n_temp": {
                    "en": "Alternative Title",
                    "ja": "その他のタイトル"
                }
            },
            {
                "key": "item_1617186385884[].subitem_1551255721061",
                "type": "select",
                "title": "Language",
                "titleMap": [
                    {
                        "name": "ja",
                        "value": "ja"
                    },
                    {
                        "name": "ja-Kana",
                        "value": "ja-Kana"
                    },
                    {
                        "name": "ja-Latn",
                        "value": "ja-Latn"
                    },
                    {
                        "name": "en",
                        "value": "en"
                    },
                    {
                        "name": "fr",
                        "value": "fr"
                    },
                    {
                        "name": "it",
                        "value": "it"
                    },
                    {
                        "name": "de",
                        "value": "de"
                    },
                    {
                        "name": "es",
                        "value": "es"
                    },
                    {
                        "name": "zh-cn",
                        "value": "zh-cn"
                    },
                    {
                        "name": "zh-tw",
                        "value": "zh-tw"
                    },
                    {
                        "name": "ru",
                        "value": "ru"
                    },
                    {
                        "name": "la",
                        "value": "la"
                    },
                    {
                        "name": "ms",
                        "value": "ms"
                    },
                    {
                        "name": "eo",
                        "value": "eo"
                    },
                    {
                        "name": "ar",
                        "value": "ar"
                    },
                    {
                        "name": "el",
                        "value": "el"
                    },
                    {
                        "name": "ko",
                        "value": "ko"
                    }
                ],
                "title_i18n": {
                    "en": "Language",
                    "ja": "言語"
                },
                "title_i18n_temp": {
                    "en": "Language",
                    "ja": "言語"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Alternative Title",
        "title_i18n": {
            "en": "Alternative Title",
            "ja": "その他のタイトル"
        }
    },
    {
        "add": "New",
        "key": "item_1617186419668",
        "items": [
            {
                "add": "New",
                "key": "item_1617186419668[].nameIdentifiers",
                "items": [
                    {
                        "key": "item_1617186419668[].nameIdentifiers[].nameIdentifierScheme",
                        "type": "select",
                        "title": "作成者識別子Scheme",
                        "titleMap": [],
                        "title_i18n": {
                            "en": "Creator Identifier Scheme",
                            "ja": "作成者識別子Scheme"
                        },
                        "title_i18n_temp": {
                            "en": "Creator Identifier Scheme",
                            "ja": "作成者識別子Scheme"
                        }
                    },
                    {
                        "key": "item_1617186419668[].nameIdentifiers[].nameIdentifierURI",
                        "type": "text",
                        "title": "作成者識別子URI",
                        "title_i18n": {
                            "en": "Creator Identifier URI",
                            "ja": "作成者識別子URI"
                        },
                        "title_i18n_temp": {
                            "en": "Creator Identifier URI",
                            "ja": "作成者識別子URI"
                        }
                    },
                    {
                        "key": "item_1617186419668[].nameIdentifiers[].nameIdentifier",
                        "type": "text",
                        "title": "作成者識別子",
                        "title_i18n": {
                            "en": "Creator Identifier",
                            "ja": "作成者識別子"
                        },
                        "title_i18n_temp": {
                            "en": "Creator Identifier",
                            "ja": "作成者識別子"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "作成者識別子",
                "title_i18n": {
                    "en": "Creator Identifier",
                    "ja": "作成者識別子"
                },
                "title_i18n_temp": {
                    "en": "Creator Identifier",
                    "ja": "作成者識別子"
                }
            },
            {
                "add": "New",
                "key": "item_1617186419668[].creatorNames",
                "items": [
                    {
                        "key": "item_1617186419668[].creatorNames[].creatorName",
                        "type": "text",
                        "title": "姓名",
                        "title_i18n": {
                            "en": "Name",
                            "ja": "姓名"
                        },
                        "title_i18n_temp": {
                            "en": "Name",
                            "ja": "姓名"
                        }
                    },
                    {
                        "key": "item_1617186419668[].creatorNames[].creatorNameLang",
                        "type": "select",
                        "title": "言語",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Kana",
                                "value": "ja-Kana"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "作成者姓名",
                "title_i18n": {
                    "en": "Creator Name",
                    "ja": "作成者姓名"
                },
                "title_i18n_temp": {
                    "en": "Creator Name",
                    "ja": "作成者姓名"
                }
            },
            {
                "add": "New",
                "key": "item_1617186419668[].familyNames",
                "items": [
                    {
                        "key": "item_1617186419668[].familyNames[].familyName",
                        "type": "text",
                        "title": "姓",
                        "title_i18n": {
                            "en": "Family Name",
                            "ja": "姓"
                        },
                        "title_i18n_temp": {
                            "en": "Family Name",
                            "ja": "姓"
                        }
                    },
                    {
                        "key": "item_1617186419668[].familyNames[].familyNameLang",
                        "type": "select",
                        "title": "言語",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Kana",
                                "value": "ja-Kana"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "作成者姓",
                "title_i18n": {
                    "en": "Creator Family Name",
                    "ja": "作成者姓"
                },
                "title_i18n_temp": {
                    "en": "Creator Family Name",
                    "ja": "作成者姓"
                }
            },
            {
                "add": "New",
                "key": "item_1617186419668[].givenNames",
                "items": [
                    {
                        "key": "item_1617186419668[].givenNames[].givenName",
                        "type": "text",
                        "title": "名",
                        "title_i18n": {
                            "en": "Given Name",
                            "ja": "名"
                        },
                        "title_i18n_temp": {
                            "en": "Given Name",
                            "ja": "名"
                        }
                    },
                    {
                        "key": "item_1617186419668[].givenNames[].givenNameLang",
                        "type": "select",
                        "title": "言語",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Kana",
                                "value": "ja-Kana"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "作成者名",
                "title_i18n": {
                    "en": "Creator Given Name",
                    "ja": "作成者名"
                },
                "title_i18n_temp": {
                    "en": "Creator Given Name",
                    "ja": "作成者名"
                }
            },
            {
                "add": "New",
                "key": "item_1617186419668[].creatorAlternatives",
                "items": [
                    {
                        "key": "item_1617186419668[].creatorAlternatives[].creatorAlternative",
                        "type": "text",
                        "title": "別名",
                        "title_i18n": {
                            "en": "Alternative Name",
                            "ja": "別名"
                        },
                        "title_i18n_temp": {
                            "en": "Alternative Name",
                            "ja": "別名"
                        }
                    },
                    {
                        "key": "item_1617186419668[].creatorAlternatives[].creatorAlternativeLang",
                        "type": "select",
                        "title": "言語",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Kana",
                                "value": "ja-Kana"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "作成者別名",
                "title_i18n": {
                    "en": "Creator Alternative Name",
                    "ja": "作成者別名"
                },
                "title_i18n_temp": {
                    "en": "Creator Alternative Name",
                    "ja": "作成者別名"
                }
            },
            {
                "add": "New",
                "key": "item_1617186419668[].creatorMails",
                "items": [
                    {
                        "key": "item_1617186419668[].creatorMails[].creatorMail",
                        "type": "text",
                        "title": "メールアドレス",
                        "title_i18n": {
                            "en": "Email Address",
                            "ja": "メールアドレス"
                        },
                        "title_i18n_temp": {
                            "en": "Email Address",
                            "ja": "メールアドレス"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "作成者メールアドレス",
                "title_i18n": {
                    "en": "Creator Email Address",
                    "ja": "作成者メールアレス"
                },
                "title_i18n_temp": {
                    "en": "Creator Email Address",
                    "ja": "作成者メールアレス"
                }
            },
            {
                "add": "New",
                "key": "item_1617186419668[].creatorAffiliations",
                "items": [
                    {
                        "add": "New",
                        "key": "item_1617186419668[].creatorAffiliations[].affiliationNameIdentifiers",
                        "items": [
                            {
                                "key": "item_1617186419668[].creatorAffiliations[].affiliationNameIdentifiers[].affiliationNameIdentifier",
                                "type": "text",
                                "title": "所属機関識別子",
                                "title_i18n": {
                                    "en": "Affiliation Name Identifier",
                                    "ja": "所属機関識別子"
                                },
                                "title_i18n_temp": {
                                    "en": "Affiliation Name Identifier",
                                    "ja": "所属機関識別子"
                                }
                            },
                            {
                                "key": "item_1617186419668[].creatorAffiliations[].affiliationNameIdentifiers[].affiliationNameIdentifierScheme",
                                "type": "select",
                                "title": "所属機関識別子スキーマ",
                                "titleMap": [
                                    {
                                        "name": "kakenhi",
                                        "value": "kakenhi"
                                    },
                                    {
                                        "name": "ISNI",
                                        "value": "ISNI"
                                    },
                                    {
                                        "name": "Ringgold",
                                        "value": "Ringgold"
                                    },
                                    {
                                        "name": "GRID",
                                        "value": "GRID"
                                    }
                                ],
                                "title_i18n": {
                                    "en": "Affiliation Name Identifier Scheme",
                                    "ja": "所属機関識別子スキーマ"
                                },
                                "title_i18n_temp": {
                                    "en": "Affiliation Name Identifier Scheme",
                                    "ja": "所属機関識別子スキーマ"
                                }
                            },
                            {
                                "key": "item_1617186419668[].creatorAffiliations[].affiliationNameIdentifiers[].affiliationNameIdentifierURI",
                                "type": "text",
                                "title": "所属機関識別子URI",
                                "title_i18n": {
                                    "en": "Affiliation Name Identifier URI",
                                    "ja": "所属機関識別子URI"
                                },
                                "title_i18n_temp": {
                                    "en": "Affiliation Name Identifier URI",
                                    "ja": "所属機関識別子URI"
                                }
                            }
                        ],
                        "style": {
                            "add": "btn-success"
                        },
                        "title": "所属機関識別子",
                        "title_i18n": {
                            "en": "Affiliation Name Identifier",
                            "ja": "所属機関識別子"
                        },
                        "title_i18n_temp": {
                            "en": "Affiliation Name Identifier",
                            "ja": "所属機関識別子"
                        }
                    },
                    {
                        "add": "New",
                        "key": "item_1617186419668[].creatorAffiliations[].affiliationNames",
                        "items": [
                            {
                                "key": "item_1617186419668[].creatorAffiliations[].affiliationNames[].affiliationName",
                                "type": "text",
                                "title": "所属機関名",
                                "title_i18n": {
                                    "en": "Affiliation Name",
                                    "ja": "所属機関名"
                                },
                                "title_i18n_temp": {
                                    "en": "Affiliation Name",
                                    "ja": "所属機関名"
                                }
                            },
                            {
                                "key": "item_1617186419668[].creatorAffiliations[].affiliationNames[].affiliationNameLang",
                                "type": "select",
                                "title": "言語",
                                "titleMap": [
                                    {
                                        "name": "ja",
                                        "value": "ja"
                                    },
                                    {
                                        "name": "ja-Kana",
                                        "value": "ja-Kana"
                                    },
                                    {
                                        "name": "ja-Latn",
                                        "value": "ja-Latn"
                                    },
                                    {
                                        "name": "en",
                                        "value": "en"
                                    },
                                    {
                                        "name": "fr",
                                        "value": "fr"
                                    },
                                    {
                                        "name": "it",
                                        "value": "it"
                                    },
                                    {
                                        "name": "de",
                                        "value": "de"
                                    },
                                    {
                                        "name": "es",
                                        "value": "es"
                                    },
                                    {
                                        "name": "zh-cn",
                                        "value": "zh-cn"
                                    },
                                    {
                                        "name": "zh-tw",
                                        "value": "zh-tw"
                                    },
                                    {
                                        "name": "ru",
                                        "value": "ru"
                                    },
                                    {
                                        "name": "la",
                                        "value": "la"
                                    },
                                    {
                                        "name": "ms",
                                        "value": "ms"
                                    },
                                    {
                                        "name": "eo",
                                        "value": "eo"
                                    },
                                    {
                                        "name": "ar",
                                        "value": "ar"
                                    },
                                    {
                                        "name": "el",
                                        "value": "el"
                                    },
                                    {
                                        "name": "ko",
                                        "value": "ko"
                                    }
                                ],
                                "title_i18n": {
                                    "en": "Language",
                                    "ja": "言語"
                                },
                                "title_i18n_temp": {
                                    "en": "Language",
                                    "ja": "言語"
                                }
                            }
                        ],
                        "style": {
                            "add": "btn-success"
                        },
                        "title": "所属機関名",
                        "title_i18n": {
                            "en": "Affiliation Name",
                            "ja": "所属機関名"
                        },
                        "title_i18n_temp": {
                            "en": "Affiliation Name",
                            "ja": "所属機関名"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "作成者所属",
                "title_i18n": {
                    "en": "Affiliation Name Identifier",
                    "ja": "作成者所属"
                },
                "title_i18n_temp": {
                    "en": "Affiliation Name Identifier",
                    "ja": "作成者所属"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Creator",
        "title_i18n": {
            "en": "Creator",
            "ja": "作成者"
        }
    },
    {
        "add": "New",
        "key": "item_1617349709064",
        "items": [
            {
                "key": "item_1617349709064[].contributorType",
                "type": "select",
                "title": "寄与者タイプ",
                "titleMap": [
                    {
                        "name": "ContactPerson",
                        "value": "ContactPerson"
                    },
                    {
                        "name": "DataCollector",
                        "value": "DataCollector"
                    },
                    {
                        "name": "DataCurator",
                        "value": "DataCurator"
                    },
                    {
                        "name": "DataManager",
                        "value": "DataManager"
                    },
                    {
                        "name": "Distributor",
                        "value": "Distributor"
                    },
                    {
                        "name": "Editor",
                        "value": "Editor"
                    },
                    {
                        "name": "HostingInstitution",
                        "value": "HostingInstitution"
                    },
                    {
                        "name": "Producer",
                        "value": "Producer"
                    },
                    {
                        "name": "ProjectLeader",
                        "value": "ProjectLeader"
                    },
                    {
                        "name": "ProjectManager",
                        "value": "ProjectManager"
                    },
                    {
                        "name": "ProjectMember",
                        "value": "ProjectMember"
                    },
                    {
                        "name": "RelatedPerson",
                        "value": "RelatedPerson"
                    },
                    {
                        "name": "Researcher",
                        "value": "Researcher"
                    },
                    {
                        "name": "ResearchGroup",
                        "value": "ResearchGroup"
                    },
                    {
                        "name": "Sponsor",
                        "value": "Sponsor"
                    },
                    {
                        "name": "Supervisor",
                        "value": "Supervisor"
                    },
                    {
                        "name": "WorkPackageLeader",
                        "value": "WorkPackageLeader"
                    },
                    {
                        "name": "Other",
                        "value": "Other"
                    }
                ],
                "title_i18n": {
                    "en": "Contributor Type",
                    "ja": "寄与者タイプ"
                },
                "title_i18n_temp": {
                    "en": "Contributor Type",
                    "ja": "寄与者タイプ"
                }
            },
            {
                "add": "New",
                "key": "item_1617349709064[].nameIdentifiers",
                "items": [
                    {
                        "key": "item_1617349709064[].nameIdentifiers[].nameIdentifierScheme",
                        "type": "select",
                        "title": "寄与者識別子Scheme",
                        "titleMap": [],
                        "title_i18n": {
                            "en": "Contributor Identifier Scheme",
                            "ja": "寄与者識別子Scheme"
                        },
                        "title_i18n_temp": {
                            "en": "Contributor Identifier Scheme",
                            "ja": "寄与者識別子Scheme"
                        }
                    },
                    {
                        "key": "item_1617349709064[].nameIdentifiers[].nameIdentifierURI",
                        "type": "text",
                        "title": "寄与者識別子URI",
                        "title_i18n": {
                            "en": "Contributor Identifier URI",
                            "ja": "寄与者識別子URI"
                        },
                        "title_i18n_temp": {
                            "en": "Contributor Identifier URI",
                            "ja": "寄与者識別子URI"
                        }
                    },
                    {
                        "key": "item_1617349709064[].nameIdentifiers[].nameIdentifier",
                        "type": "text",
                        "title": "寄与者識別子",
                        "title_i18n": {
                            "en": "Contributor Identifier",
                            "ja": "寄与者識別子"
                        },
                        "title_i18n_temp": {
                            "en": "Contributor Identifier",
                            "ja": "寄与者識別子"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "寄与者識別子",
                "title_i18n": {
                    "en": "Contributor Identifier",
                    "ja": "寄与者識別子"
                },
                "title_i18n_temp": {
                    "en": "Contributor Identifier",
                    "ja": "寄与者識別子"
                }
            },
            {
                "add": "New",
                "key": "item_1617349709064[].contributorNames",
                "items": [
                    {
                        "key": "item_1617349709064[].contributorNames[].contributorName",
                        "type": "text",
                        "title": "姓名",
                        "title_i18n": {
                            "en": "Name",
                            "ja": "姓名"
                        },
                        "title_i18n_temp": {
                            "en": "Name",
                            "ja": "姓名"
                        }
                    },
                    {
                        "key": "item_1617349709064[].contributorNames[].lang",
                        "type": "select",
                        "title": "言語",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Kana",
                                "value": "ja-Kana"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "寄与者姓名",
                "title_i18n": {
                    "en": "Contributor Name",
                    "ja": "寄与者姓名"
                },
                "title_i18n_temp": {
                    "en": "Contributor Name",
                    "ja": "寄与者姓名"
                }
            },
            {
                "add": "New",
                "key": "item_1617349709064[].familyNames",
                "items": [
                    {
                        "key": "item_1617349709064[].familyNames[].familyName",
                        "type": "text",
                        "title": "姓",
                        "title_i18n": {
                            "en": "Family Name",
                            "ja": "姓"
                        },
                        "title_i18n_temp": {
                            "en": "Family Name",
                            "ja": "姓"
                        }
                    },
                    {
                        "key": "item_1617349709064[].familyNames[].familyNameLang",
                        "type": "select",
                        "title": "言語",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Kana",
                                "value": "ja-Kana"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "寄与者姓",
                "title_i18n": {
                    "en": "Contributor Family Name",
                    "ja": "寄与者姓"
                },
                "title_i18n_temp": {
                    "en": "Contributor Family Name",
                    "ja": "寄与者姓"
                }
            },
            {
                "add": "New",
                "key": "item_1617349709064[].givenNames",
                "items": [
                    {
                        "key": "item_1617349709064[].givenNames[].givenName",
                        "type": "text",
                        "title": "名",
                        "title_i18n": {
                            "en": "Given Name",
                            "ja": "名"
                        },
                        "title_i18n_temp": {
                            "en": "Given Name",
                            "ja": "名"
                        }
                    },
                    {
                        "key": "item_1617349709064[].givenNames[].givenNameLang",
                        "type": "select",
                        "title": "言語",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Kana",
                                "value": "ja-Kana"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "寄与者名",
                "title_i18n": {
                    "en": "Contributor Given Name",
                    "ja": "寄与者名"
                },
                "title_i18n_temp": {
                    "en": "Contributor Given Name",
                    "ja": "寄与者名"
                }
            },
            {
                "add": "New",
                "key": "item_1617349709064[].contributorAlternatives",
                "items": [
                    {
                        "key": "item_1617349709064[].contributorAlternatives[].contributorAlternative",
                        "type": "text",
                        "title": "別名",
                        "title_i18n": {
                            "en": "Alternative Name",
                            "ja": "別名"
                        },
                        "title_i18n_temp": {
                            "en": "Alternative Name",
                            "ja": "別名"
                        }
                    },
                    {
                        "key": "item_1617349709064[].contributorAlternatives[].contributorAlternativeLang",
                        "type": "select",
                        "title": "言語",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Kana",
                                "value": "ja-Kana"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "寄与者別名",
                "title_i18n": {
                    "en": "Contributor Alternative Name",
                    "ja": "寄与者別名"
                },
                "title_i18n_temp": {
                    "en": "Contributor Alternative Name",
                    "ja": "寄与者別名"
                }
            },
            {
                "add": "New",
                "key": "item_1617349709064[].contributorAffiliations",
                "items": [
                    {
                        "add": "New",
                        "key": "item_1617349709064[].contributorAffiliations[].contributorAffiliationNameIdentifiers",
                        "items": [
                            {
                                "key": "item_1617349709064[].contributorAffiliations[].contributorAffiliationNameIdentifiers[].contributorAffiliationNameIdentifier",
                                "type": "text",
                                "title": "所属機関識別子",
                                "title_i18n": {
                                    "en": "Affiliation Name Identifier",
                                    "ja": "所属機関識別子"
                                },
                                "title_i18n_temp": {
                                    "en": "Affiliation Name Identifier",
                                    "ja": "所属機関識別子"
                                }
                            },
                            {
                                "key": "item_1617349709064[].contributorAffiliations[].contributorAffiliationNameIdentifiers[].contributorAffiliationScheme",
                                "type": "select",
                                "title": "所属機関識別子スキーマ",
                                "titleMap": [
                                    {
                                        "name": "kakenhi",
                                        "value": "kakenhi"
                                    },
                                    {
                                        "name": "ISNI",
                                        "value": "ISNI"
                                    },
                                    {
                                        "name": "Ringgold",
                                        "value": "Ringgold"
                                    },
                                    {
                                        "name": "GRID",
                                        "value": "GRID"
                                    }
                                ],
                                "title_i18n": {
                                    "en": "Affiliation Name Identifier Scheme",
                                    "ja": "所属機関識別子スキーマ"
                                },
                                "title_i18n_temp": {
                                    "en": "Affiliation Name Identifier Scheme",
                                    "ja": "所属機関識別子スキーマ"
                                }
                            },
                            {
                                "key": "item_1617349709064[].contributorAffiliations[].contributorAffiliationNameIdentifiers[].contributorAffiliationURI",
                                "type": "text",
                                "title": "所属機関識別子URI",
                                "title_i18n": {
                                    "en": "Affiliation Name Identifier URI",
                                    "ja": "所属機関識別子URI"
                                },
                                "title_i18n_temp": {
                                    "en": "Affiliation Name Identifier URI",
                                    "ja": "所属機関識別子URI"
                                }
                            }
                        ],
                        "style": {
                            "add": "btn-success"
                        },
                        "title": "所属機関識別子",
                        "title_i18n": {
                            "en": "Affiliation Name Identifier",
                            "ja": "所属機関識別子"
                        },
                        "title_i18n_temp": {
                            "en": "Affiliation Name Identifier",
                            "ja": "所属機関識別子"
                        }
                    },
                    {
                        "add": "New",
                        "key": "item_1617349709064[].contributorAffiliations[].contributorAffiliationNames",
                        "items": [
                            {
                                "key": "item_1617349709064[].contributorAffiliations[].contributorAffiliationNames[].contributorAffiliationName",
                                "type": "text",
                                "title": "所属機関名",
                                "title_i18n": {
                                    "en": "Affiliation Name",
                                    "ja": "所属機関名"
                                },
                                "title_i18n_temp": {
                                    "en": "Affiliation Name",
                                    "ja": "所属機関名"
                                }
                            },
                            {
                                "key": "item_1617349709064[].contributorAffiliations[].contributorAffiliationNames[].contributorAffiliationNameLang",
                                "type": "select",
                                "title": "言語",
                                "titleMap": [
                                    {
                                        "name": "ja",
                                        "value": "ja"
                                    },
                                    {
                                        "name": "ja-Kana",
                                        "value": "ja-Kana"
                                    },
                                    {
                                        "name": "ja-Latn",
                                        "value": "ja-Latn"
                                    },
                                    {
                                        "name": "en",
                                        "value": "en"
                                    },
                                    {
                                        "name": "fr",
                                        "value": "fr"
                                    },
                                    {
                                        "name": "it",
                                        "value": "it"
                                    },
                                    {
                                        "name": "de",
                                        "value": "de"
                                    },
                                    {
                                        "name": "es",
                                        "value": "es"
                                    },
                                    {
                                        "name": "zh-cn",
                                        "value": "zh-cn"
                                    },
                                    {
                                        "name": "zh-tw",
                                        "value": "zh-tw"
                                    },
                                    {
                                        "name": "ru",
                                        "value": "ru"
                                    },
                                    {
                                        "name": "la",
                                        "value": "la"
                                    },
                                    {
                                        "name": "ms",
                                        "value": "ms"
                                    },
                                    {
                                        "name": "eo",
                                        "value": "eo"
                                    },
                                    {
                                        "name": "ar",
                                        "value": "ar"
                                    },
                                    {
                                        "name": "el",
                                        "value": "el"
                                    },
                                    {
                                        "name": "ko",
                                        "value": "ko"
                                    }
                                ],
                                "title_i18n": {
                                    "en": "Language",
                                    "ja": "言語"
                                },
                                "title_i18n_temp": {
                                    "en": "Language",
                                    "ja": "言語"
                                }
                            }
                        ],
                        "style": {
                            "add": "btn-success"
                        },
                        "title": "所属機関名",
                        "title_i18n": {
                            "en": "Affiliation Name",
                            "ja": "所属機関名"
                        },
                        "title_i18n_temp": {
                            "en": "Affiliation Name",
                            "ja": "所属機関名"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "寄与者所属",
                "title_i18n": {
                    "en": "Affiliation Name Identifier",
                    "ja": "寄与者所属"
                },
                "title_i18n_temp": {
                    "en": "Affiliation Name Identifier",
                    "ja": "寄与者所属"
                }
            },
            {
                "add": "New",
                "key": "item_1617349709064[].contributorMails",
                "items": [
                    {
                        "key": "item_1617349709064[].contributorMails[].contributorMail",
                        "type": "text",
                        "title": "メールアドレス",
                        "title_i18n": {
                            "en": "Email Address",
                            "ja": "メールアドレス"
                        },
                        "title_i18n_temp": {
                            "en": "Email Address",
                            "ja": "メールアドレス"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "寄与者メールアドレス",
                "title_i18n": {
                    "en": "Contributor Email Address",
                    "ja": "寄与者メールアドレス"
                },
                "title_i18n_temp": {
                    "en": "Contributor Email Address",
                    "ja": "寄与者メールアドレス"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Contributor",
        "title_i18n": {
            "en": "Contributor",
            "ja": "寄与者"
        }
    },
    {
        "key": "item_1617186476635",
        "type": "fieldset",
        "items": [
            {
                "key": "item_1617186476635.subitem_1522299639480",
                "type": "select",
                "title": "アクセス権",
                "onChange": "changedAccessRights(this, modelValue)",
                "titleMap": [
                    {
                        "name": "embargoed access",
                        "value": "embargoed access"
                    },
                    {
                        "name": "metadata only access",
                        "value": "metadata only access"
                    },
                    {
                        "name": "open access",
                        "value": "open access"
                    },
                    {
                        "name": "restricted access",
                        "value": "restricted access"
                    }
                ],
                "title_i18n": {
                    "en": "Access Rights",
                    "ja": "アクセス権"
                },
                "title_i18n_temp": {
                    "en": "Access Rights",
                    "ja": "アクセス権"
                }
            },
            {
                "key": "item_1617186476635.subitem_1600958577026",
                "type": "text",
                "title": "アクセス権URI",
                "readonly": true,
                "title_i18n": {
                    "en": "Access Rights URI",
                    "ja": "アクセス権URI"
                },
                "fieldHtmlClass": "txt-access-rights-uri",
                "title_i18n_temp": {
                    "en": "Access Rights URI",
                    "ja": "アクセス権URI"
                }
            }
        ],
        "title": "Access Rights",
        "title_i18n": {
            "en": "Access Rights",
            "ja": "アクセス権"
        }
    },
    {
        "key": "item_1617351524846",
        "type": "fieldset",
        "items": [
            {
                "key": "item_1617351524846.subitem_1523260933860",
                "type": "select",
                "title": "APC",
                "titleMap": [
                    {
                        "name": "Paid",
                        "value": "Paid"
                    },
                    {
                        "name": "Fully waived",
                        "value": "Fully waived"
                    },
                    {
                        "name": "Not required",
                        "value": "Not required"
                    },
                    {
                        "name": "Partially waived",
                        "value": "Partially waived"
                    },
                    {
                        "name": "Not charged",
                        "value": "Not charged"
                    },
                    {
                        "name": "Unknown",
                        "value": "Unknown"
                    }
                ],
                "title_i18n": {
                    "en": "APC",
                    "ja": "APC"
                }
            }
        ],
        "title": "APC",
        "title_i18n": {
            "en": "APC",
            "ja": "APC"
        }
    },
    {
        "add": "New",
        "key": "item_1617186499011",
        "items": [
            {
                "key": "item_1617186499011[].subitem_1522650717957",
                "type": "select",
                "title": "言語",
                "titleMap": [
                    {
                        "name": "ja",
                        "value": "ja"
                    },
                    {
                        "name": "ja-Latn",
                        "value": "ja-Latn"
                    },
                    {
                        "name": "en",
                        "value": "en"
                    },
                    {
                        "name": "fr",
                        "value": "fr"
                    },
                    {
                        "name": "it",
                        "value": "it"
                    },
                    {
                        "name": "de",
                        "value": "de"
                    },
                    {
                        "name": "es",
                        "value": "es"
                    },
                    {
                        "name": "zh-cn",
                        "value": "zh-cn"
                    },
                    {
                        "name": "zh-tw",
                        "value": "zh-tw"
                    },
                    {
                        "name": "ru",
                        "value": "ru"
                    },
                    {
                        "name": "la",
                        "value": "la"
                    },
                    {
                        "name": "ms",
                        "value": "ms"
                    },
                    {
                        "name": "eo",
                        "value": "eo"
                    },
                    {
                        "name": "ar",
                        "value": "ar"
                    },
                    {
                        "name": "el",
                        "value": "el"
                    },
                    {
                        "name": "ko",
                        "value": "ko"
                    }
                ],
                "title_i18n": {
                    "en": "Language",
                    "ja": "言語"
                },
                "title_i18n_temp": {
                    "en": "Language",
                    "ja": "言語"
                }
            },
            {
                "key": "item_1617186499011[].subitem_1522650727486",
                "type": "text",
                "title": "権利情報Resource",
                "title_i18n": {
                    "en": "Rights Information Resource",
                    "ja": "権利情報Resource"
                },
                "title_i18n_temp": {
                    "en": "Rights Information Resource",
                    "ja": "権利情報Resource"
                }
            },
            {
                "key": "item_1617186499011[].subitem_1522651041219",
                "type": "text",
                "title": "権利情報",
                "title_i18n": {
                    "en": "Rights Information",
                    "ja": "権利情報"
                },
                "title_i18n_temp": {
                    "en": "Rights Information",
                    "ja": "権利情報"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Rights",
        "title_i18n": {
            "en": "Rights",
            "ja": "権利情報"
        }
    },
    {
        "add": "New",
        "key": "item_1617610673286",
        "items": [
            {
                "add": "New",
                "key": "item_1617610673286[].nameIdentifiers",
                "items": [
                    {
                        "key": "item_1617610673286[].nameIdentifiers[].nameIdentifierScheme",
                        "type": "select",
                        "title": "権利者識別子Scheme",
                        "titleMap": [],
                        "title_i18n": {
                            "en": "Right Holder Identifier Scheme",
                            "ja": "権利者識別子Scheme"
                        },
                        "title_i18n_temp": {
                            "en": "Right Holder Identifier Scheme",
                            "ja": "権利者識別子Scheme"
                        }
                    },
                    {
                        "key": "item_1617610673286[].nameIdentifiers[].nameIdentifierURI",
                        "type": "text",
                        "title": "権利者識別子URI",
                        "title_i18n": {
                            "en": "Right Holder Identifier URI",
                            "ja": "権利者識別子URI"
                        },
                        "title_i18n_temp": {
                            "en": "Right Holder Identifier URI",
                            "ja": "権利者識別子URI"
                        }
                    },
                    {
                        "key": "item_1617610673286[].nameIdentifiers[].nameIdentifier",
                        "type": "text",
                        "title": "権利者識別子",
                        "title_i18n": {
                            "en": "Right Holder Identifier",
                            "ja": "権利者識別子"
                        },
                        "title_i18n_temp": {
                            "en": "Right Holder Identifier",
                            "ja": "権利者識別子"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "権利者識別子",
                "title_i18n": {
                    "en": "Right Holder Identifier",
                    "ja": "権利者識別子"
                },
                "title_i18n_temp": {
                    "en": "Right Holder Identifier",
                    "ja": "権利者識別子"
                }
            },
            {
                "add": "New",
                "key": "item_1617610673286[].rightHolderNames",
                "items": [
                    {
                        "key": "item_1617610673286[].rightHolderNames[].rightHolderLanguage",
                        "type": "select",
                        "title": "言語",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Kana",
                                "value": "ja-Kana"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    },
                    {
                        "key": "item_1617610673286[].rightHolderNames[].rightHolderName",
                        "type": "text",
                        "title": "権利者名",
                        "title_i18n": {
                            "en": "Right Holder Name",
                            "ja": "権利者名"
                        },
                        "title_i18n_temp": {
                            "en": "Right Holder Name",
                            "ja": "権利者名"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "権利者名",
                "title_i18n": {
                    "en": "Right Holder Name",
                    "ja": "権利者名"
                },
                "title_i18n_temp": {
                    "en": "Right Holder Name",
                    "ja": "権利者名"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Rights Holder",
        "title_i18n": {
            "en": "Rights Holder",
            "ja": "権利者情報"
        }
    },
    {
        "add": "New",
        "key": "item_1617186609386",
        "items": [
            {
                "key": "item_1617186609386[].subitem_1522299896455",
                "type": "select",
                "title": "言語",
                "titleMap": [
                    {
                        "name": "ja",
                        "value": "ja"
                    },
                    {
                        "name": "ja-Kana",
                        "value": "ja-Kana"
                    },
                    {
                        "name": "ja-Latn",
                        "value": "ja-Latn"
                    },
                    {
                        "name": "en",
                        "value": "en"
                    },
                    {
                        "name": "fr",
                        "value": "fr"
                    },
                    {
                        "name": "it",
                        "value": "it"
                    },
                    {
                        "name": "de",
                        "value": "de"
                    },
                    {
                        "name": "es",
                        "value": "es"
                    },
                    {
                        "name": "zh-cn",
                        "value": "zh-cn"
                    },
                    {
                        "name": "zh-tw",
                        "value": "zh-tw"
                    },
                    {
                        "name": "ru",
                        "value": "ru"
                    },
                    {
                        "name": "la",
                        "value": "la"
                    },
                    {
                        "name": "ms",
                        "value": "ms"
                    },
                    {
                        "name": "eo",
                        "value": "eo"
                    },
                    {
                        "name": "ar",
                        "value": "ar"
                    },
                    {
                        "name": "el",
                        "value": "el"
                    },
                    {
                        "name": "ko",
                        "value": "ko"
                    }
                ],
                "title_i18n": {
                    "en": "Language",
                    "ja": "言語"
                },
                "title_i18n_temp": {
                    "en": "Language",
                    "ja": "言語"
                }
            },
            {
                "key": "item_1617186609386[].subitem_1522300014469",
                "type": "select",
                "title": "主題Scheme",
                "titleMap": [
                    {
                        "name": "BSH",
                        "value": "BSH"
                    },
                    {
                        "name": "DDC",
                        "value": "DDC"
                    },
                    {
                        "name": "LCC",
                        "value": "LCC"
                    },
                    {
                        "name": "LCSH",
                        "value": "LCSH"
                    },
                    {
                        "name": "MeSH",
                        "value": "MeSH"
                    },
                    {
                        "name": "NDC",
                        "value": "NDC"
                    },
                    {
                        "name": "NDLC",
                        "value": "NDLC"
                    },
                    {
                        "name": "NDLSH",
                        "value": "NDLSH"
                    },
                    {
                        "name": "SciVal",
                        "value": "SciVal"
                    },
                    {
                        "name": "UDC",
                        "value": "UDC"
                    },
                    {
                        "name": "Other",
                        "value": "Other"
                    }
                ],
                "title_i18n": {
                    "en": "Subject Scheme",
                    "ja": "主題Scheme"
                },
                "title_i18n_temp": {
                    "en": "Subject Scheme",
                    "ja": "主題Scheme"
                }
            },
            {
                "key": "item_1617186609386[].subitem_1522300048512",
                "type": "text",
                "title": "主題URI",
                "title_i18n": {
                    "en": "Subject URI",
                    "ja": "主題URI"
                },
                "title_i18n_temp": {
                    "en": "Subject URI",
                    "ja": "主題URI"
                }
            },
            {
                "key": "item_1617186609386[].subitem_1523261968819",
                "type": "text",
                "title": "主題",
                "title_i18n": {
                    "en": "Subject",
                    "ja": "主題"
                },
                "title_i18n_temp": {
                    "en": "Subject",
                    "ja": "主題"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Subject",
        "title_i18n": {
            "en": "Subject",
            "ja": "主題"
        }
    },
    {
        "add": "New",
        "key": "item_1617186626617",
        "items": [
            {
                "key": "item_1617186626617[].subitem_description_type",
                "type": "select",
                "title": "内容記述タイプ",
                "titleMap": [
                    {
                        "name": "Abstract",
                        "value": "Abstract"
                    },
                    {
                        "name": "Methods",
                        "value": "Methods"
                    },
                    {
                        "name": "TableOfContents",
                        "value": "TableOfContents"
                    },
                    {
                        "name": "TechnicalInfo",
                        "value": "TechnicalInfo"
                    },
                    {
                        "name": "Other",
                        "value": "Other"
                    }
                ],
                "title_i18n": {
                    "en": "Description Type",
                    "ja": "内容記述タイプ"
                },
                "title_i18n_temp": {
                    "en": "Description Type",
                    "ja": "内容記述タイプ"
                }
            },
            {
                "key": "item_1617186626617[].subitem_description",
                "type": "textarea",
                "title": "内容記述",
                "title_i18n": {
                    "en": "Description",
                    "ja": "内容記述"
                },
                "title_i18n_temp": {
                    "en": "Description",
                    "ja": "内容記述"
                }
            },
            {
                "key": "item_1617186626617[].subitem_description_language",
                "type": "select",
                "title": "言語",
                "titleMap": [
                    {
                        "name": "ja",
                        "value": "ja"
                    },
                    {
                        "name": "ja-Latn",
                        "value": "ja-Latn"
                    },
                    {
                        "name": "en",
                        "value": "en"
                    },
                    {
                        "name": "fr",
                        "value": "fr"
                    },
                    {
                        "name": "it",
                        "value": "it"
                    },
                    {
                        "name": "de",
                        "value": "de"
                    },
                    {
                        "name": "es",
                        "value": "es"
                    },
                    {
                        "name": "zh-cn",
                        "value": "zh-cn"
                    },
                    {
                        "name": "zh-tw",
                        "value": "zh-tw"
                    },
                    {
                        "name": "ru",
                        "value": "ru"
                    },
                    {
                        "name": "la",
                        "value": "la"
                    },
                    {
                        "name": "ms",
                        "value": "ms"
                    },
                    {
                        "name": "eo",
                        "value": "eo"
                    },
                    {
                        "name": "ar",
                        "value": "ar"
                    },
                    {
                        "name": "el",
                        "value": "el"
                    },
                    {
                        "name": "ko",
                        "value": "ko"
                    }
                ],
                "title_i18n": {
                    "en": "Language",
                    "ja": "言語"
                },
                "title_i18n_temp": {
                    "en": "Language",
                    "ja": "言語"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Description",
        "title_i18n": {
            "en": "Description",
            "ja": "内容記述"
        }
    },
    {
        "add": "New",
        "key": "item_1617186643794",
        "items": [
            {
                "key": "item_1617186643794[].subitem_1522300295150",
                "type": "select",
                "title": "言語",
                "titleMap": [
                    {
                        "name": "ja",
                        "value": "ja"
                    },
                    {
                        "name": "ja-Latn",
                        "value": "ja-Latn"
                    },
                    {
                        "name": "en",
                        "value": "en"
                    },
                    {
                        "name": "fr",
                        "value": "fr"
                    },
                    {
                        "name": "it",
                        "value": "it"
                    },
                    {
                        "name": "de",
                        "value": "de"
                    },
                    {
                        "name": "es",
                        "value": "es"
                    },
                    {
                        "name": "zh-cn",
                        "value": "zh-cn"
                    },
                    {
                        "name": "zh-tw",
                        "value": "zh-tw"
                    },
                    {
                        "name": "ru",
                        "value": "ru"
                    },
                    {
                        "name": "la",
                        "value": "la"
                    },
                    {
                        "name": "ms",
                        "value": "ms"
                    },
                    {
                        "name": "eo",
                        "value": "eo"
                    },
                    {
                        "name": "ar",
                        "value": "ar"
                    },
                    {
                        "name": "el",
                        "value": "el"
                    },
                    {
                        "name": "ko",
                        "value": "ko"
                    }
                ],
                "title_i18n": {
                    "en": "Language",
                    "ja": "言語"
                },
                "title_i18n_temp": {
                    "en": "Language",
                    "ja": "言語"
                }
            },
            {
                "key": "item_1617186643794[].subitem_1522300316516",
                "type": "text",
                "title": "出版者",
                "title_i18n": {
                    "en": "Publisher",
                    "ja": "出版者"
                },
                "title_i18n_temp": {
                    "en": "Publisher",
                    "ja": "出版者"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Publisher",
        "title_i18n": {
            "en": "Publisher",
            "ja": "出版者"
        }
    },
    {
        "add": "New",
        "key": "item_1617186660861",
        "items": [
            {
                "key": "item_1617186660861[].subitem_1522300695726",
                "type": "select",
                "title": "日付タイプ",
                "titleMap": [
                    {
                        "name": "Accepted",
                        "value": "Accepted"
                    },
                    {
                        "name": "Available",
                        "value": "Available"
                    },
                    {
                        "name": "Collected",
                        "value": "Collected"
                    },
                    {
                        "name": "Copyrighted",
                        "value": "Copyrighted"
                    },
                    {
                        "name": "Created",
                        "value": "Created"
                    },
                    {
                        "name": "Issued",
                        "value": "Issued"
                    },
                    {
                        "name": "Submitted",
                        "value": "Submitted"
                    },
                    {
                        "name": "Updated",
                        "value": "Updated"
                    },
                    {
                        "name": "Valid",
                        "value": "Valid"
                    }
                ],
                "title_i18n": {
                    "en": "Date Type",
                    "ja": "日付タイプ"
                },
                "title_i18n_temp": {
                    "en": "Date Type",
                    "ja": "日付タイプ"
                }
            },
            {
                "key": "item_1617186660861[].subitem_1522300722591",
                "type": "template",
                "title": "日付",
                "format": "yyyy-MM-dd",
                "title_i18n": {
                    "en": "Date",
                    "ja": "日付"
                },
                "templateUrl": "/static/templates/weko_deposit/datepicker_multi_format.html",
                "title_i18n_temp": {
                    "en": "Date",
                    "ja": "日付"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Date",
        "title_i18n": {
            "en": "Date",
            "ja": "日付"
        }
    },
    {
        "add": "New",
        "key": "item_1617186702042",
        "items": [
            {
                "key": "item_1617186702042[].subitem_1551255818386",
                "type": "select",
                "title": "Language",
                "titleMap": [
                    {
                        "name": "jpn",
                        "value": "jpn"
                    },
                    {
                        "name": "eng",
                        "value": "eng"
                    },
                    {
                        "name": "fra",
                        "value": "fra"
                    },
                    {
                        "name": "ita",
                        "value": "ita"
                    },
                    {
                        "name": "spa",
                        "value": "spa"
                    },
                    {
                        "name": "zho",
                        "value": "zho"
                    },
                    {
                        "name": "rus",
                        "value": "rus"
                    },
                    {
                        "name": "lat",
                        "value": "lat"
                    },
                    {
                        "name": "msa",
                        "value": "msa"
                    },
                    {
                        "name": "epo",
                        "value": "epo"
                    },
                    {
                        "name": "ara",
                        "value": "ara"
                    },
                    {
                        "name": "ell",
                        "value": "ell"
                    },
                    {
                        "name": "kor",
                        "value": "kor"
                    }
                ],
                "title_i18n": {
                    "en": "Language",
                    "ja": "言語"
                },
                "title_i18n_temp": {
                    "en": "Language",
                    "ja": "言語"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Language",
        "title_i18n": {
            "en": "Language",
            "ja": "言語"
        }
    },
    {
        "key": "item_1617258105262",
        "type": "fieldset",
        "items": [
            {
                "key": "item_1617258105262.resourcetype",
                "type": "select",
                "title": "資源タイプ",
                "onChange": "resourceTypeSelect()",
                "titleMap": [
                    {
                        "name": "conference paper",
                        "value": "conference paper"
                    },
                    {
                        "name": "data paper",
                        "value": "data paper"
                    },
                    {
                        "name": "departmental bulletin paper",
                        "value": "departmental bulletin paper"
                    },
                    {
                        "name": "editorial",
                        "value": "editorial"
                    },
                    {
                        "name": "journal article",
                        "value": "journal article"
                    },
                    {
                        "name": "newspaper",
                        "value": "newspaper"
                    },
                    {
                        "name": "periodical",
                        "value": "periodical"
                    },
                    {
                        "name": "review article",
                        "value": "review article"
                    },
                    {
                        "name": "software paper",
                        "value": "software paper"
                    },
                    {
                        "name": "article",
                        "value": "article"
                    },
                    {
                        "name": "book",
                        "value": "book"
                    },
                    {
                        "name": "book part",
                        "value": "book part"
                    },
                    {
                        "name": "cartographic material",
                        "value": "cartographic material"
                    },
                    {
                        "name": "map",
                        "value": "map"
                    },
                    {
                        "name": "conference object",
                        "value": "conference object"
                    },
                    {
                        "name": "conference proceedings",
                        "value": "conference proceedings"
                    },
                    {
                        "name": "conference poster",
                        "value": "conference poster"
                    },
                    {
                        "name": "aggregated data",
                        "value": "aggregated data"
                    },
                    {
                        "name": "clinical trial data",
                        "value": "clinical trial data"
                    },
                    {
                        "name": "compiled data",
                        "value": "compiled data"
                    },
                    {
                        "name": "encoded data",
                        "value": "encoded data"
                    },
                    {
                        "name": "experimental data",
                        "value": "experimental data"
                    },
                    {
                        "name": "genomic data",
                        "value": "genomic data"
                    },
                    {
                        "name": "geospatial data",
                        "value": "geospatial data"
                    },
                    {
                        "name": "laboratory notebook",
                        "value": "laboratory notebook"
                    },
                    {
                        "name": "measurement and test data",
                        "value": "measurement and test data"
                    },
                    {
                        "name": "observational data",
                        "value": "observational data"
                    },
                    {
                        "name": "recorded data",
                        "value": "recorded data"
                    },
                    {
                        "name": "simulation data",
                        "value": "simulation data"
                    },
                    {
                        "name": "survey data",
                        "value": "survey data"
                    },
                    {
                        "name": "dataset",
                        "value": "dataset"
                    },
                    {
                        "name": "interview",
                        "value": "interview"
                    },
                    {
                        "name": "image",
                        "value": "image"
                    },
                    {
                        "name": "still image",
                        "value": "still image"
                    },
                    {
                        "name": "moving image",
                        "value": "moving image"
                    },
                    {
                        "name": "video",
                        "value": "video"
                    },
                    {
                        "name": "lecture",
                        "value": "lecture"
                    },
                    {
                        "name": "patent",
                        "value": "patent"
                    },
                    {
                        "name": "internal report",
                        "value": "internal report"
                    },
                    {
                        "name": "report",
                        "value": "report"
                    },
                    {
                        "name": "research report",
                        "value": "research report"
                    },
                    {
                        "name": "technical report",
                        "value": "technical report"
                    },
                    {
                        "name": "policy report",
                        "value": "policy report"
                    },
                    {
                        "name": "report part",
                        "value": "report part"
                    },
                    {
                        "name": "working paper",
                        "value": "working paper"
                    },
                    {
                        "name": "data management plan",
                        "value": "data management plan"
                    },
                    {
                        "name": "sound",
                        "value": "sound"
                    },
                    {
                        "name": "thesis",
                        "value": "thesis"
                    },
                    {
                        "name": "bachelor thesis",
                        "value": "bachelor thesis"
                    },
                    {
                        "name": "master thesis",
                        "value": "master thesis"
                    },
                    {
                        "name": "doctoral thesis",
                        "value": "doctoral thesis"
                    },
                    {
                        "name": "interactive resource",
                        "value": "interactive resource"
                    },
                    {
                        "name": "learning object",
                        "value": "learning object"
                    },
                    {
                        "name": "manuscript",
                        "value": "manuscript"
                    },
                    {
                        "name": "musical notation",
                        "value": "musical notation"
                    },
                    {
                        "name": "research proposal",
                        "value": "research proposal"
                    },
                    {
                        "name": "software",
                        "value": "software"
                    },
                    {
                        "name": "technical documentation",
                        "value": "technical documentation"
                    },
                    {
                        "name": "workflow",
                        "value": "workflow"
                    },
                    {
                        "name": "other",
                        "value": "other"
                    }
                ],
                "title_i18n": {
                    "en": "Resource Type",
                    "ja": "資源タイプ"
                },
                "title_i18n_temp": {
                    "en": "Resource Type",
                    "ja": "資源タイプ"
                }
            },
            {
                "key": "item_1617258105262.resourceuri",
                "type": "text",
                "title": "資源タイプ識別子",
                "readonly": true,
                "title_i18n": {
                    "en": "Resource Type Identifier",
                    "ja": "資源タイプ識別子"
                },
                "title_i18n_temp": {
                    "en": "Resource Type Identifier",
                    "ja": "資源タイプ識別子"
                }
            }
        ],
        "title": "Resource Type",
        "title_i18n": {
            "en": "Resource Type",
            "ja": "資源タイプ"
        }
    },
    {
        "key": "item_1617349808926",
        "type": "fieldset",
        "items": [
            {
                "key": "item_1617349808926.subitem_1523263171732",
                "type": "text",
                "title": "バージョン情報",
                "title_i18n": {
                    "en": "Version",
                    "ja": "バージョン情報"
                },
                "title_i18n_temp": {
                    "en": "Version",
                    "ja": "バージョン情報"
                }
            }
        ],
        "title": "Version",
        "title_i18n": {
            "en": "Version",
            "ja": "バージョン情報"
        }
    },
    {
        "key": "item_1617265215918",
        "type": "fieldset",
        "items": [
            {
                "key": "item_1617265215918.subitem_1522305645492",
                "type": "select",
                "title": "出版タイプ",
                "onChange": "changedVersionType(this, modelValue)",
                "titleMap": [
                    {
                        "name": "AO",
                        "value": "AO"
                    },
                    {
                        "name": "SMUR",
                        "value": "SMUR"
                    },
                    {
                        "name": "AM",
                        "value": "AM"
                    },
                    {
                        "name": "P",
                        "value": "P"
                    },
                    {
                        "name": "VoR",
                        "value": "VoR"
                    },
                    {
                        "name": "CVoR",
                        "value": "CVoR"
                    },
                    {
                        "name": "EVoR",
                        "value": "EVoR"
                    },
                    {
                        "name": "NA",
                        "value": "NA"
                    }
                ],
                "title_i18n": {
                    "en": "Version Type",
                    "ja": "出版タイプ"
                },
                "title_i18n_temp": {
                    "en": "Version Type",
                    "ja": "出版タイプ"
                }
            },
            {
                "key": "item_1617265215918.subitem_1600292170262",
                "type": "text",
                "title": "出版タイプResource",
                "readonly": true,
                "title_i18n": {
                    "en": "Version Type Resource",
                    "ja": "出版タイプResource"
                },
                "fieldHtmlClass": "txt-version-resource",
                "title_i18n_temp": {
                    "en": "Version Type Resource",
                    "ja": "出版タイプResource"
                }
            }
        ],
        "title": "Version Type",
        "title_i18n": {
            "en": "Version Type",
            "ja": "出版タイプ"
        }
    },
    {
        "add": "New",
        "key": "item_1617186783814",
        "items": [
            {
                "key": "item_1617186783814[].subitem_identifier_uri",
                "type": "text",
                "title": "識別子",
                "title_i18n": {
                    "en": "Identifier",
                    "ja": "識別子"
                },
                "title_i18n_temp": {
                    "en": "Identifier",
                    "ja": "識別子"
                }
            },
            {
                "key": "item_1617186783814[].subitem_identifier_type",
                "type": "select",
                "title": "識別子タイプ",
                "titleMap": [
                    {
                        "name": "DOI",
                        "value": "DOI"
                    },
                    {
                        "name": "HDL",
                        "value": "HDL"
                    },
                    {
                        "name": "URI",
                        "value": "URI"
                    }
                ],
                "title_i18n": {
                    "en": "Identifier Type",
                    "ja": "識別子タイプ"
                },
                "title_i18n_temp": {
                    "en": "Identifier Type",
                    "ja": "識別子タイプ"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Identifier",
        "title_i18n": {
            "en": "Identifier",
            "ja": "識別子"
        }
    },
    {
        "key": "item_1617186819068",
        "type": "fieldset",
        "items": [
            {
                "key": "item_1617186819068.subitem_identifier_reg_text",
                "type": "text",
                "title": "ID登録",
                "readonly": true,
                "title_i18n": {
                    "en": "Identifier Registration",
                    "ja": "ID登録"
                },
                "title_i18n_temp": {
                    "en": "Identifier Registration",
                    "ja": "ID登録"
                }
            },
            {
                "key": "item_1617186819068.subitem_identifier_reg_type",
                "type": "select",
                "title": "ID登録タイプ",
                "readonly": true,
                "titleMap": [
                    {
                        "name": "JaLC",
                        "value": "JaLC"
                    },
                    {
                        "name": "Crossref",
                        "value": "Crossref"
                    },
                    {
                        "name": "DataCite",
                        "value": "DataCite"
                    },
                    {
                        "name": "PMID【現在不使用】",
                        "value": "PMID【現在不使用】"
                    }
                ],
                "title_i18n": {
                    "en": "Identifier Registration Type",
                    "ja": "ID登録タイプ"
                },
                "title_i18n_temp": {
                    "en": "Identifier Registration Type",
                    "ja": "ID登録タイプ"
                }
            }
        ],
        "title": "Identifier Registration",
        "title_i18n": {
            "en": "Identifier Registration",
            "ja": "ID登録"
        }
    },
    {
        "add": "New",
        "key": "item_1617353299429",
        "items": [
            {
                "key": "item_1617353299429[].subitem_1522306207484",
                "type": "select",
                "title": "関連タイプ",
                "titleMap": [
                    {
                        "name": "isVersionOf",
                        "value": "isVersionOf"
                    },
                    {
                        "name": "hasVersion",
                        "value": "hasVersion"
                    },
                    {
                        "name": "isPartOf",
                        "value": "isPartOf"
                    },
                    {
                        "name": "hasPart",
                        "value": "hasPart"
                    },
                    {
                        "name": "isReferencedBy",
                        "value": "isReferencedBy"
                    },
                    {
                        "name": "references",
                        "value": "references"
                    },
                    {
                        "name": "isFormatOf",
                        "value": "isFormatOf"
                    },
                    {
                        "name": "hasFormat",
                        "value": "hasFormat"
                    },
                    {
                        "name": "isReplacedBy",
                        "value": "isReplacedBy"
                    },
                    {
                        "name": "replaces",
                        "value": "replaces"
                    },
                    {
                        "name": "isRequiredBy",
                        "value": "isRequiredBy"
                    },
                    {
                        "name": "requires",
                        "value": "requires"
                    },
                    {
                        "name": "isSupplementTo",
                        "value": "isSupplementTo"
                    },
                    {
                        "name": "isSupplementedBy",
                        "value": "isSupplementedBy"
                    },
                    {
                        "name": "isIdenticalTo",
                        "value": "isIdenticalTo"
                    },
                    {
                        "name": "isDerivedFrom",
                        "value": "isDerivedFrom"
                    },
                    {
                        "name": "isSourceOf",
                        "value": "isSourceOf"
                    },
                    {
                        "name": "isCitedBy",
                        "value": "isCitedBy"
                    },
                    {
                        "name": "Cites",
                        "value": "Cites"
                    }
                ],
                "title_i18n": {
                    "en": "Relation Type",
                    "ja": "関連タイプ"
                },
                "title_i18n_temp": {
                    "en": "Relation Type",
                    "ja": "関連タイプ"
                }
            },
            {
                "key": "item_1617353299429[].subitem_1522306287251",
                "type": "fieldset",
                "items": [
                    {
                        "key": "item_1617353299429[].subitem_1522306287251.subitem_1522306382014",
                        "type": "select",
                        "title": "識別子タイプ",
                        "titleMap": [
                            {
                                "name": "ARK",
                                "value": "ARK"
                            },
                            {
                                "name": "arXiv",
                                "value": "arXiv"
                            },
                            {
                                "name": "DOI",
                                "value": "DOI"
                            },
                            {
                                "name": "HDL",
                                "value": "HDL"
                            },
                            {
                                "name": "ICHUSHI",
                                "value": "ICHUSHI"
                            },
                            {
                                "name": "ISBN",
                                "value": "ISBN"
                            },
                            {
                                "name": "J-GLOBAL",
                                "value": "J-GLOBAL"
                            },
                            {
                                "name": "Local",
                                "value": "Local"
                            },
                            {
                                "name": "PISSN",
                                "value": "PISSN"
                            },
                            {
                                "name": "EISSN",
                                "value": "EISSN"
                            },
                            {
                                "name": "ISSN【非推奨】",
                                "value": "ISSN【非推奨】"
                            },
                            {
                                "name": "NAID",
                                "value": "NAID"
                            },
                            {
                                "name": "NCID",
                                "value": "NCID"
                            },
                            {
                                "name": "PMID",
                                "value": "PMID"
                            },
                            {
                                "name": "PURL",
                                "value": "PURL"
                            },
                            {
                                "name": "SCOPUS",
                                "value": "SCOPUS"
                            },
                            {
                                "name": "URI",
                                "value": "URI"
                            },
                            {
                                "name": "WOS",
                                "value": "WOS"
                            }
                        ],
                        "title_i18n": {
                            "en": "Identifier Type",
                            "ja": "識別子タイプ"
                        },
                        "title_i18n_temp": {
                            "en": "Identifier Type",
                            "ja": "識別子タイプ"
                        }
                    },
                    {
                        "key": "item_1617353299429[].subitem_1522306287251.subitem_1522306436033",
                        "type": "text",
                        "title": "関連識別子",
                        "title_i18n": {
                            "en": "Relation Identifier",
                            "ja": "関連識別子"
                        },
                        "title_i18n_temp": {
                            "en": "Relation Identifier",
                            "ja": "関連識別子"
                        }
                    }
                ],
                "title": "関連識別子",
                "title_i18n": {
                    "en": "Relation Identifier",
                    "ja": "関連識別子"
                },
                "title_i18n_temp": {
                    "en": "Relation Identifier",
                    "ja": "関連識別子"
                }
            },
            {
                "add": "New",
                "key": "item_1617353299429[].subitem_1523320863692",
                "items": [
                    {
                        "key": "item_1617353299429[].subitem_1523320863692[].subitem_1523320867455",
                        "type": "select",
                        "title": "言語",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    },
                    {
                        "key": "item_1617353299429[].subitem_1523320863692[].subitem_1523320909613",
                        "type": "text",
                        "title": "関連名称",
                        "title_i18n": {
                            "en": "Related Title",
                            "ja": "関連名称"
                        },
                        "title_i18n_temp": {
                            "en": "Related Title",
                            "ja": "関連名称"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "関連名称",
                "title_i18n": {
                    "en": "Related Title",
                    "ja": "関連名称"
                },
                "title_i18n_temp": {
                    "en": "Related Title",
                    "ja": "関連名称"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Relation",
        "title_i18n": {
            "en": "Relation",
            "ja": "関連情報"
        }
    },
    {
        "add": "New",
        "key": "item_1617186859717",
        "items": [
            {
                "key": "item_1617186859717[].subitem_1522658018441",
                "type": "select",
                "title": "言語",
                "titleMap": [
                    {
                        "name": "ja",
                        "value": "ja"
                    },
                    {
                        "name": "ja-Latn",
                        "value": "ja-Latn"
                    },
                    {
                        "name": "en",
                        "value": "en"
                    },
                    {
                        "name": "fr",
                        "value": "fr"
                    },
                    {
                        "name": "it",
                        "value": "it"
                    },
                    {
                        "name": "de",
                        "value": "de"
                    },
                    {
                        "name": "es",
                        "value": "es"
                    },
                    {
                        "name": "zh-cn",
                        "value": "zh-cn"
                    },
                    {
                        "name": "zh-tw",
                        "value": "zh-tw"
                    },
                    {
                        "name": "ru",
                        "value": "ru"
                    },
                    {
                        "name": "la",
                        "value": "la"
                    },
                    {
                        "name": "ms",
                        "value": "ms"
                    },
                    {
                        "name": "eo",
                        "value": "eo"
                    },
                    {
                        "name": "ar",
                        "value": "ar"
                    },
                    {
                        "name": "el",
                        "value": "el"
                    },
                    {
                        "name": "ko",
                        "value": "ko"
                    }
                ],
                "title_i18n": {
                    "en": "Language",
                    "ja": "言語"
                },
                "title_i18n_temp": {
                    "en": "Language",
                    "ja": "言語"
                }
            },
            {
                "key": "item_1617186859717[].subitem_1522658031721",
                "type": "text",
                "title": "時間的範囲",
                "title_i18n": {
                    "en": "Temporal",
                    "ja": "時間的範囲"
                },
                "title_i18n_temp": {
                    "en": "Temporal",
                    "ja": "時間的範囲"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Temporal",
        "title_i18n": {
            "en": "Temporal",
            "ja": "時間的範囲"
        }
    },
    {
        "add": "New",
        "key": "item_1617186882738",
        "items": [
            {
                "key": "item_1617186882738[].subitem_geolocation_point",
                "type": "fieldset",
                "items": [
                    {
                        "key": "item_1617186882738[].subitem_geolocation_point.subitem_point_longitude",
                        "type": "text",
                        "title": "経度",
                        "title_i18n": {
                            "en": "Point Longitude",
                            "ja": "経度"
                        },
                        "title_i18n_temp": {
                            "en": "Point Longitude",
                            "ja": "経度"
                        }
                    },
                    {
                        "key": "item_1617186882738[].subitem_geolocation_point.subitem_point_latitude",
                        "type": "text",
                        "title": "緯度",
                        "title_i18n": {
                            "en": "Point Latitude",
                            "ja": "緯度"
                        },
                        "title_i18n_temp": {
                            "en": "Point Latitude",
                            "ja": "緯度"
                        }
                    }
                ],
                "title": "位置情報（点）",
                "title_i18n": {
                    "en": "Geo Location Point",
                    "ja": "位置情報（点）"
                },
                "title_i18n_temp": {
                    "en": "Geo Location Point",
                    "ja": "位置情報（点）"
                }
            },
            {
                "key": "item_1617186882738[].subitem_geolocation_box",
                "type": "fieldset",
                "items": [
                    {
                        "key": "item_1617186882738[].subitem_geolocation_box.subitem_west_longitude",
                        "type": "text",
                        "title": "西部経度",
                        "title_i18n": {
                            "en": "West Bound Longitude",
                            "ja": "西部経度"
                        },
                        "title_i18n_temp": {
                            "en": "West Bound Longitude",
                            "ja": "西部経度"
                        }
                    },
                    {
                        "key": "item_1617186882738[].subitem_geolocation_box.subitem_east_longitude",
                        "type": "text",
                        "title": "東部経度",
                        "title_i18n": {
                            "en": "East Bound Longitude",
                            "ja": "東部経度"
                        },
                        "title_i18n_temp": {
                            "en": "East Bound Longitude",
                            "ja": "東部経度"
                        }
                    },
                    {
                        "key": "item_1617186882738[].subitem_geolocation_box.subitem_south_latitude",
                        "type": "text",
                        "title": "南部緯度",
                        "title_i18n": {
                            "en": "South Bound Latitude",
                            "ja": "南部緯度"
                        },
                        "title_i18n_temp": {
                            "en": "South Bound Latitude",
                            "ja": "南部緯度"
                        }
                    },
                    {
                        "key": "item_1617186882738[].subitem_geolocation_box.subitem_north_latitude",
                        "type": "text",
                        "title": "北部緯度",
                        "title_i18n": {
                            "en": "North Bound Latitude",
                            "ja": "北部緯度"
                        },
                        "title_i18n_temp": {
                            "en": "North Bound Latitude",
                            "ja": "北部緯度"
                        }
                    }
                ],
                "title": "位置情報（空間）",
                "title_i18n": {
                    "en": "Geo Location Box",
                    "ja": "位置情報（空間）"
                },
                "title_i18n_temp": {
                    "en": "Geo Location Box",
                    "ja": "位置情報（空間）"
                }
            },
            {
                "add": "New",
                "key": "item_1617186882738[].subitem_geolocation_place",
                "items": [
                    {
                        "key": "item_1617186882738[].subitem_geolocation_place[].subitem_geolocation_place_text",
                        "type": "text",
                        "title": "位置情報（自由記述）",
                        "title_i18n": {
                            "en": "Geo Location Place",
                            "ja": "位置情報（自由記述）"
                        },
                        "title_i18n_temp": {
                            "en": "Geo Location Place",
                            "ja": "位置情報（自由記述）"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "位置情報（自由記述）",
                "title_i18n": {
                    "en": "Geo Location Place",
                    "ja": "位置情報（自由記述）"
                },
                "title_i18n_temp": {
                    "en": "Geo Location Place",
                    "ja": "位置情報（自由記述）"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Geo Location",
        "title_i18n": {
            "en": "Geo Location",
            "ja": "位置情報"
        }
    },
    {
        "add": "New",
        "key": "item_1617186901218",
        "items": [
            {
                "key": "item_1617186901218[].subitem_1522399143519",
                "type": "fieldset",
                "items": [
                    {
                        "key": "item_1617186901218[].subitem_1522399143519.subitem_1522399281603",
                        "type": "select",
                        "title": "助成機関識別子タイプ",
                        "titleMap": [
                            {
                                "name": "Crossref Funder",
                                "value": "Crossref Funder"
                            },
                            {
                                "name": "GRID",
                                "value": "GRID"
                            },
                            {
                                "name": "ISNI",
                                "value": "ISNI"
                            },
                            {
                                "name": "Other",
                                "value": "Other"
                            },
                            {
                                "name": "kakenhi",
                                "value": "kakenhi"
                            }
                        ],
                        "title_i18n": {
                            "en": "Funder Identifier Type",
                            "ja": "助成機関識別子タイプ"
                        },
                        "title_i18n_temp": {
                            "en": "Funder Identifier Type",
                            "ja": "助成機関識別子タイプ"
                        }
                    },
                    {
                        "key": "item_1617186901218[].subitem_1522399143519.subitem_1522399333375",
                        "type": "text",
                        "title": "助成機関識別子",
                        "title_i18n": {
                            "en": "Funder Identifier",
                            "ja": "助成機関識別子"
                        },
                        "title_i18n_temp": {
                            "en": "Funder Identifier",
                            "ja": "助成機関識別子"
                        }
                    }
                ],
                "title": "助成機関識別子",
                "title_i18n": {
                    "en": "Funder Identifier",
                    "ja": "助成機関識別子"
                },
                "title_i18n_temp": {
                    "en": "Funder Identifier",
                    "ja": "助成機関識別子"
                }
            },
            {
                "add": "New",
                "key": "item_1617186901218[].subitem_1522399412622",
                "items": [
                    {
                        "key": "item_1617186901218[].subitem_1522399412622[].subitem_1522399416691",
                        "type": "select",
                        "title": "言語",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    },
                    {
                        "key": "item_1617186901218[].subitem_1522399412622[].subitem_1522737543681",
                        "type": "text",
                        "title": "助成機関名",
                        "title_i18n": {
                            "en": "Funder Name",
                            "ja": "助成機関名"
                        },
                        "title_i18n_temp": {
                            "en": "Funder Name",
                            "ja": "助成機関名"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "助成機関名",
                "title_i18n": {
                    "en": "Funder Name",
                    "ja": "助成機関名"
                },
                "title_i18n_temp": {
                    "en": "Funder Name",
                    "ja": "助成機関名"
                }
            },
            {
                "key": "item_1617186901218[].subitem_1522399571623",
                "type": "fieldset",
                "items": [
                    {
                        "key": "item_1617186901218[].subitem_1522399571623.subitem_1522399585738",
                        "type": "text",
                        "title": "研究課題URI",
                        "title_i18n": {
                            "en": "Award URI",
                            "ja": "研究課題URI"
                        },
                        "title_i18n_temp": {
                            "en": "Award URI",
                            "ja": "研究課題URI"
                        }
                    },
                    {
                        "key": "item_1617186901218[].subitem_1522399571623.subitem_1522399628911",
                        "type": "text",
                        "title": "研究課題番号",
                        "title_i18n": {
                            "en": "Award Number",
                            "ja": "研究課題番号"
                        },
                        "title_i18n_temp": {
                            "en": "Award Number",
                            "ja": "研究課題番号"
                        }
                    }
                ],
                "title": "研究課題番号",
                "title_i18n": {
                    "en": "Award Number",
                    "ja": "研究課題番号"
                },
                "title_i18n_temp": {
                    "en": "Award Number",
                    "ja": "研究課題番号"
                }
            },
            {
                "add": "New",
                "key": "item_1617186901218[].subitem_1522399651758",
                "items": [
                    {
                        "key": "item_1617186901218[].subitem_1522399651758[].subitem_1522721910626",
                        "type": "select",
                        "title": "言語",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    },
                    {
                        "key": "item_1617186901218[].subitem_1522399651758[].subitem_1522721929892",
                        "type": "text",
                        "title": "研究課題名",
                        "title_i18n": {
                            "en": "Award Title",
                            "ja": "研究課題名"
                        },
                        "title_i18n_temp": {
                            "en": "Award Title",
                            "ja": "研究課題名"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "研究課題名",
                "title_i18n": {
                    "en": "Award Title",
                    "ja": "研究課題名"
                },
                "title_i18n_temp": {
                    "en": "Award Title",
                    "ja": "研究課題名"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Funding Reference",
        "title_i18n": {
            "en": "Funding Reference",
            "ja": "助成情報"
        }
    },
    {
        "add": "New",
        "key": "item_1617186920753",
        "items": [
            {
                "key": "item_1617186920753[].subitem_1522646500366",
                "type": "select",
                "title": "収録物識別子タイプ",
                "titleMap": [
                    {
                        "name": "PISSN",
                        "value": "PISSN"
                    },
                    {
                        "name": "EISSN",
                        "value": "EISSN"
                    },
                    {
                        "name": "ISSN",
                        "value": "ISSN"
                    },
                    {
                        "name": "NCID",
                        "value": "NCID"
                    }
                ],
                "title_i18n": {
                    "en": "Source Identifier Type",
                    "ja": "収録物識別子タイプ"
                },
                "title_i18n_temp": {
                    "en": "Source Identifier Type",
                    "ja": "収録物識別子タイプ"
                }
            },
            {
                "key": "item_1617186920753[].subitem_1522646572813",
                "type": "text",
                "title": "収録物識別子",
                "title_i18n": {
                    "en": "Source Identifier",
                    "ja": "収録物識別子"
                },
                "title_i18n_temp": {
                    "en": "Source Identifier",
                    "ja": "収録物識別子"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Source Identifier",
        "title_i18n": {
            "en": "Source Identifier",
            "ja": "収録物識別子"
        }
    },
    {
        "add": "New",
        "key": "item_1617186941041",
        "items": [
            {
                "key": "item_1617186941041[].subitem_1522650068558",
                "type": "select",
                "title": "言語",
                "titleMap": [
                    {
                        "name": "ja",
                        "value": "ja"
                    },
                    {
                        "name": "ja-Latn",
                        "value": "ja-Latn"
                    },
                    {
                        "name": "en",
                        "value": "en"
                    },
                    {
                        "name": "fr",
                        "value": "fr"
                    },
                    {
                        "name": "it",
                        "value": "it"
                    },
                    {
                        "name": "de",
                        "value": "de"
                    },
                    {
                        "name": "es",
                        "value": "es"
                    },
                    {
                        "name": "zh-cn",
                        "value": "zh-cn"
                    },
                    {
                        "name": "zh-tw",
                        "value": "zh-tw"
                    },
                    {
                        "name": "ru",
                        "value": "ru"
                    },
                    {
                        "name": "la",
                        "value": "la"
                    },
                    {
                        "name": "ms",
                        "value": "ms"
                    },
                    {
                        "name": "eo",
                        "value": "eo"
                    },
                    {
                        "name": "ar",
                        "value": "ar"
                    },
                    {
                        "name": "el",
                        "value": "el"
                    },
                    {
                        "name": "ko",
                        "value": "ko"
                    }
                ],
                "title_i18n": {
                    "en": "Language",
                    "ja": "言語"
                },
                "title_i18n_temp": {
                    "en": "Language",
                    "ja": "言語"
                }
            },
            {
                "key": "item_1617186941041[].subitem_1522650091861",
                "type": "text",
                "title": "収録物名",
                "title_i18n": {
                    "en": "Source Title",
                    "ja": "収録物名"
                },
                "title_i18n_temp": {
                    "en": "Source Title",
                    "ja": "収録物名"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Source Title",
        "title_i18n": {
            "en": "Source Title",
            "ja": "収録物名"
        }
    },
    {
        "key": "item_1617186959569",
        "type": "fieldset",
        "items": [
            {
                "key": "item_1617186959569.subitem_1551256328147",
                "type": "text",
                "title": "Volume Number",
                "title_i18n": {
                    "en": "Volume Number",
                    "ja": "巻"
                },
                "title_i18n_temp": {
                    "en": "Volume Number",
                    "ja": "巻"
                }
            }
        ],
        "title": "Volume Number",
        "title_i18n": {
            "en": "Volume Number",
            "ja": "巻"
        }
    },
    {
        "key": "item_1617186981471",
        "type": "fieldset",
        "items": [
            {
                "key": "item_1617186981471.subitem_1551256294723",
                "type": "text",
                "title": "Issue Number",
                "title_i18n": {
                    "en": "Issue Number",
                    "ja": "号"
                },
                "title_i18n_temp": {
                    "en": "Issue Number",
                    "ja": "号"
                }
            }
        ],
        "title": "Issue Number",
        "title_i18n": {
            "en": "Issue Number",
            "ja": "号"
        }
    },
    {
        "key": "item_1617186994930",
        "type": "fieldset",
        "items": [
            {
                "key": "item_1617186994930.subitem_1551256248092",
                "type": "text",
                "title": "Number of Pages",
                "title_i18n": {
                    "en": "Number of Pages",
                    "ja": "ページ数"
                },
                "title_i18n_temp": {
                    "en": "Number of Pages",
                    "ja": "ページ数"
                }
            }
        ],
        "title": "Number of Pages",
        "title_i18n": {
            "en": "Number of Pages",
            "ja": "ページ数"
        }
    },
    {
        "key": "item_1617187024783",
        "type": "fieldset",
        "items": [
            {
                "key": "item_1617187024783.subitem_1551256198917",
                "type": "text",
                "title": "Page Start",
                "title_i18n": {
                    "en": "Page Start",
                    "ja": "開始ページ"
                },
                "title_i18n_temp": {
                    "en": "Page Start",
                    "ja": "開始ページ"
                }
            }
        ],
        "title": "Page Start",
        "title_i18n": {
            "en": "Page Start",
            "ja": "開始ページ"
        }
    },
    {
        "key": "item_1617187045071",
        "type": "fieldset",
        "items": [
            {
                "key": "item_1617187045071.subitem_1551256185532",
                "type": "text",
                "title": "Page End",
                "title_i18n": {
                    "en": "Page End",
                    "ja": "終了ページ"
                },
                "title_i18n_temp": {
                    "en": "Page End",
                    "ja": "終了ページ"
                }
            }
        ],
        "title": "Page End",
        "title_i18n": {
            "en": "Page End",
            "ja": "終了ページ"
        }
    },
    {
        "key": "item_1617187056579",
        "type": "fieldset",
        "items": [
            {
                "add": "New",
                "key": "item_1617187056579.bibliographic_titles",
                "items": [
                    {
                        "key": "item_1617187056579.bibliographic_titles[].bibliographic_title",
                        "type": "text",
                        "title": "タイトル",
                        "title_i18n": {
                            "en": "Title",
                            "ja": "タイトル"
                        },
                        "title_i18n_temp": {
                            "en": "Title",
                            "ja": "タイトル"
                        }
                    },
                    {
                        "key": "item_1617187056579.bibliographic_titles[].bibliographic_titleLang",
                        "type": "select",
                        "title": "言語",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "雑誌名",
                "title_i18n": {
                    "en": "Journal Title",
                    "ja": "雑誌名"
                },
                "title_i18n_temp": {
                    "en": "Journal Title",
                    "ja": "雑誌名"
                }
            },
            {
                "key": "item_1617187056579.bibliographicVolumeNumber",
                "type": "text",
                "title": "巻",
                "title_i18n": {
                    "en": "Volume Number",
                    "ja": "巻"
                },
                "title_i18n_temp": {
                    "en": "Volume Number",
                    "ja": "巻"
                }
            },
            {
                "key": "item_1617187056579.bibliographicIssueNumber",
                "type": "text",
                "title": "号",
                "title_i18n": {
                    "en": "Issue Number",
                    "ja": "号"
                },
                "title_i18n_temp": {
                    "en": "Issue Number",
                    "ja": "号"
                }
            },
            {
                "key": "item_1617187056579.bibliographicPageStart",
                "type": "text",
                "title": "開始ページ",
                "title_i18n": {
                    "en": "Page Start",
                    "ja": "開始ページ"
                },
                "title_i18n_temp": {
                    "en": "Page Start",
                    "ja": "開始ページ"
                }
            },
            {
                "key": "item_1617187056579.bibliographicPageEnd",
                "type": "text",
                "title": "終了ページ",
                "title_i18n": {
                    "en": "Page End",
                    "ja": "終了ページ"
                },
                "title_i18n_temp": {
                    "en": "Page End",
                    "ja": "終了ページ"
                }
            },
            {
                "key": "item_1617187056579.bibliographicNumberOfPages",
                "type": "text",
                "title": "ページ数",
                "title_i18n": {
                    "en": "Number of Page",
                    "ja": "ページ数"
                },
                "title_i18n_temp": {
                    "en": "Number of Page",
                    "ja": "ページ数"
                }
            },
            {
                "key": "item_1617187056579.bibliographicIssueDates",
                "type": "fieldset",
                "items": [
                    {
                        "key": "item_1617187056579.bibliographicIssueDates.bibliographicIssueDate",
                        "type": "template",
                        "title": "日付",
                        "format": "yyyy-MM-dd",
                        "title_i18n": {
                            "en": "Date",
                            "ja": "日付"
                        },
                        "templateUrl": "/static/templates/weko_deposit/datepicker_multi_format.html",
                        "title_i18n_temp": {
                            "en": "Date",
                            "ja": "日付"
                        }
                    },
                    {
                        "key": "item_1617187056579.bibliographicIssueDates.bibliographicIssueDateType",
                        "type": "select",
                        "title": "日付タイプ",
                        "titleMap": [
                            {
                                "name": "Issued",
                                "value": "Issued"
                            }
                        ],
                        "title_i18n": {
                            "en": "Date Type",
                            "ja": "日付タイプ"
                        },
                        "title_i18n_temp": {
                            "en": "Date Type",
                            "ja": "日付タイプ"
                        }
                    }
                ],
                "title": "発行日",
                "title_i18n": {
                    "en": "Issue Date",
                    "ja": "発行日"
                },
                "title_i18n_temp": {
                    "en": "Issue Date",
                    "ja": "発行日"
                }
            }
        ],
        "title": "Bibliographic Information",
        "title_i18n": {
            "en": "Bibliographic Information",
            "ja": "書誌情報"
        }
    },
    {
        "key": "item_1617187087799",
        "type": "fieldset",
        "items": [
            {
                "key": "item_1617187087799.subitem_1551256171004",
                "type": "text",
                "title": "Dissertation Number",
                "title_i18n": {
                    "en": "Dissertation Number",
                    "ja": "学位授与番号"
                },
                "title_i18n_temp": {
                    "en": "Dissertation Number",
                    "ja": "学位授与番号"
                }
            }
        ],
        "title": "Dissertation Number",
        "title_i18n": {
            "en": "Dissertation Number",
            "ja": "学位授与番号"
        }
    },
    {
        "add": "New",
        "key": "item_1617187112279",
        "items": [
            {
                "key": "item_1617187112279[].subitem_1551256126428",
                "type": "text",
                "title": "Degree Name",
                "title_i18n": {
                    "en": "Degree Name",
                    "ja": "学位名"
                },
                "title_i18n_temp": {
                    "en": "Degree Name",
                    "ja": "学位名"
                }
            },
            {
                "key": "item_1617187112279[].subitem_1551256129013",
                "type": "select",
                "title": "Language",
                "titleMap": [
                    {
                        "name": "ja",
                        "value": "ja"
                    },
                    {
                        "name": "ja-Latn",
                        "value": "ja-Latn"
                    },
                    {
                        "name": "en",
                        "value": "en"
                    },
                    {
                        "name": "fr",
                        "value": "fr"
                    },
                    {
                        "name": "it",
                        "value": "it"
                    },
                    {
                        "name": "de",
                        "value": "de"
                    },
                    {
                        "name": "es",
                        "value": "es"
                    },
                    {
                        "name": "zh-cn",
                        "value": "zh-cn"
                    },
                    {
                        "name": "zh-tw",
                        "value": "zh-tw"
                    },
                    {
                        "name": "ru",
                        "value": "ru"
                    },
                    {
                        "name": "la",
                        "value": "la"
                    },
                    {
                        "name": "ms",
                        "value": "ms"
                    },
                    {
                        "name": "eo",
                        "value": "eo"
                    },
                    {
                        "name": "ar",
                        "value": "ar"
                    },
                    {
                        "name": "el",
                        "value": "el"
                    },
                    {
                        "name": "ko",
                        "value": "ko"
                    }
                ],
                "title_i18n": {
                    "en": "Language",
                    "ja": "言語"
                },
                "title_i18n_temp": {
                    "en": "Language",
                    "ja": "言語"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Degree Name",
        "title_i18n": {
            "en": "Degree Name",
            "ja": "学位名"
        }
    },
    {
        "key": "item_1617187136212",
        "type": "fieldset",
        "items": [
            {
                "key": "item_1617187136212.subitem_1551256096004",
                "type": "template",
                "title": "Date Granted",
                "format": "yyyy-MM-dd",
                "title_i18n": {
                    "en": "Date Granted",
                    "ja": "学位授与年月日"
                },
                "templateUrl": "/static/templates/weko_deposit/datepicker_multi_format.html",
                "title_i18n_temp": {
                    "en": "Date Granted",
                    "ja": "学位授与年月日"
                }
            }
        ],
        "title": "Date Granted",
        "title_i18n": {
            "en": "Date Granted",
            "ja": "学位授与年月日"
        }
    },
    {
        "add": "New",
        "key": "item_1617944105607",
        "items": [
            {
                "add": "New",
                "key": "item_1617944105607[].subitem_1551256015892",
                "items": [
                    {
                        "key": "item_1617944105607[].subitem_1551256015892[].subitem_1551256027296",
                        "type": "text",
                        "title": "Degree Grantor Name Identifier",
                        "title_i18n": {
                            "en": "Degree Grantor Name Identifier",
                            "ja": "学位授与機関識別子"
                        },
                        "title_i18n_temp": {
                            "en": "Degree Grantor Name Identifier",
                            "ja": "学位授与機関識別子"
                        }
                    },
                    {
                        "key": "item_1617944105607[].subitem_1551256015892[].subitem_1551256029891",
                        "type": "select",
                        "title": "Degree Grantor Name Identifier Scheme",
                        "titleMap": [
                            {
                                "name": "kakenhi",
                                "value": "kakenhi"
                            }
                        ],
                        "title_i18n": {
                            "en": "Degree Grantor Name Identifier Scheme",
                            "ja": "学位授与機関識別子Scheme"
                        },
                        "title_i18n_temp": {
                            "en": "Degree Grantor Name Identifier Scheme",
                            "ja": "学位授与機関識別子Scheme"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "Degree Grantor Name Identifier",
                "title_i18n": {
                    "en": "Degree Grantor Name Identifier",
                    "ja": "学位授与機関識別子"
                },
                "title_i18n_temp": {
                    "en": "Degree Grantor Name Identifier",
                    "ja": "学位授与機関識別子"
                }
            },
            {
                "add": "New",
                "key": "item_1617944105607[].subitem_1551256037922",
                "items": [
                    {
                        "key": "item_1617944105607[].subitem_1551256037922[].subitem_1551256042287",
                        "type": "text",
                        "title": "Degree Grantor Name",
                        "title_i18n": {
                            "en": "Degree Grantor Name",
                            "ja": "学位授与機関名"
                        },
                        "title_i18n_temp": {
                            "en": "Degree Grantor Name",
                            "ja": "学位授与機関名"
                        }
                    },
                    {
                        "key": "item_1617944105607[].subitem_1551256037922[].subitem_1551256047619",
                        "type": "select",
                        "title": "Language",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "Degree Grantor Name",
                "title_i18n": {
                    "en": "Degree Grantor Name",
                    "ja": "学位授与機関名"
                },
                "title_i18n_temp": {
                    "en": "Degree Grantor Name",
                    "ja": "学位授与機関名"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Degree Grantor",
        "title_i18n": {
            "en": "Degree Grantor",
            "ja": "学位授与機関"
        }
    },
    {
        "add": "New",
        "key": "item_1617187187528",
        "items": [
            {
                "add": "New",
                "key": "item_1617187187528[].subitem_1599711633003",
                "items": [
                    {
                        "key": "item_1617187187528[].subitem_1599711633003[].subitem_1599711636923",
                        "type": "text",
                        "title": "Conference Name",
                        "title_i18n": {
                            "en": "Conference Name",
                            "ja": "会議名"
                        },
                        "title_i18n_temp": {
                            "en": "Conference Name",
                            "ja": "会議名"
                        }
                    },
                    {
                        "key": "item_1617187187528[].subitem_1599711633003[].subitem_1599711645590",
                        "type": "select",
                        "title": "Language",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "Conference Name",
                "title_i18n": {
                    "en": "Conference Name",
                    "ja": "会議名"
                },
                "title_i18n_temp": {
                    "en": "Conference Name",
                    "ja": "会議名"
                }
            },
            {
                "key": "item_1617187187528[].subitem_1599711655652",
                "type": "text",
                "title": "Conference Sequence",
                "title_i18n": {
                    "en": "Conference Sequence",
                    "ja": "回次"
                },
                "title_i18n_temp": {
                    "en": "Conference Sequence",
                    "ja": "回次"
                }
            },
            {
                "add": "New",
                "key": "item_1617187187528[].subitem_1599711660052",
                "items": [
                    {
                        "key": "item_1617187187528[].subitem_1599711660052[].subitem_1599711680082",
                        "type": "text",
                        "title": "Conference Sponsor",
                        "title_i18n": {
                            "en": "Conference Sponsor",
                            "ja": "主催機関"
                        },
                        "title_i18n_temp": {
                            "en": "Conference Sponsor",
                            "ja": "主催機関"
                        }
                    },
                    {
                        "key": "item_1617187187528[].subitem_1599711660052[].subitem_1599711686511",
                        "type": "select",
                        "title": "Language",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "Conference Sponsor",
                "title_i18n": {
                    "en": "Conference Sponsor",
                    "ja": "主催機関"
                },
                "title_i18n_temp": {
                    "en": "Conference Sponsor",
                    "ja": "主催機関"
                }
            },
            {
                "key": "item_1617187187528[].subitem_1599711699392",
                "type": "fieldset",
                "items": [
                    {
                        "key": "item_1617187187528[].subitem_1599711699392.subitem_1599711731891",
                        "type": "text",
                        "title": "Start Year",
                        "title_i18n": {
                            "en": "Start Year",
                            "ja": "開始年"
                        },
                        "title_i18n_temp": {
                            "en": "Start Year",
                            "ja": "開始年"
                        }
                    },
                    {
                        "key": "item_1617187187528[].subitem_1599711699392.subitem_1599711727603",
                        "type": "text",
                        "title": "Start Month",
                        "title_i18n": {
                            "en": "Start Month",
                            "ja": "開始月"
                        },
                        "title_i18n_temp": {
                            "en": "Start Month",
                            "ja": "開始月"
                        }
                    },
                    {
                        "key": "item_1617187187528[].subitem_1599711699392.subitem_1599711712451",
                        "type": "text",
                        "title": "Start Day",
                        "title_i18n": {
                            "en": "Start Day",
                            "ja": "開始日"
                        },
                        "title_i18n_temp": {
                            "en": "Start Day",
                            "ja": "開始日"
                        }
                    },
                    {
                        "key": "item_1617187187528[].subitem_1599711699392.subitem_1599711743722",
                        "type": "text",
                        "title": "End Year",
                        "title_i18n": {
                            "en": "End Year",
                            "ja": "終了年"
                        },
                        "title_i18n_temp": {
                            "en": "End Year",
                            "ja": "終了年"
                        }
                    },
                    {
                        "key": "item_1617187187528[].subitem_1599711699392.subitem_1599711739022",
                        "type": "text",
                        "title": "End Month",
                        "title_i18n": {
                            "en": "End Month",
                            "ja": "終了月"
                        },
                        "title_i18n_temp": {
                            "en": "End Month",
                            "ja": "終了月"
                        }
                    },
                    {
                        "key": "item_1617187187528[].subitem_1599711699392.subitem_1599711704251",
                        "type": "text",
                        "title": "Conference Date",
                        "title_i18n": {
                            "en": "Conference Date",
                            "ja": "開催期間"
                        },
                        "title_i18n_temp": {
                            "en": "Conference Date",
                            "ja": "開催期間"
                        }
                    },
                    {
                        "key": "item_1617187187528[].subitem_1599711699392.subitem_1599711735410",
                        "type": "text",
                        "title": "End Day",
                        "title_i18n": {
                            "en": "End Day",
                            "ja": "終了日"
                        },
                        "title_i18n_temp": {
                            "en": "End Day",
                            "ja": "終了日"
                        }
                    },
                    {
                        "key": "item_1617187187528[].subitem_1599711699392.subitem_1599711745532",
                        "type": "select",
                        "title": "Language",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    }
                ],
                "title": "Conference Date",
                "title_i18n": {
                    "en": "Conference Date",
                    "ja": "開催期間"
                },
                "title_i18n_temp": {
                    "en": "Conference Date",
                    "ja": "開催期間"
                }
            },
            {
                "add": "New",
                "key": "item_1617187187528[].subitem_1599711758470",
                "items": [
                    {
                        "key": "item_1617187187528[].subitem_1599711758470[].subitem_1599711769260",
                        "type": "text",
                        "title": "Conference Venue",
                        "title_i18n": {
                            "en": "Conference Venue",
                            "ja": "開催会場"
                        },
                        "title_i18n_temp": {
                            "en": "Conference Venue",
                            "ja": "開催会場"
                        }
                    },
                    {
                        "key": "item_1617187187528[].subitem_1599711758470[].subitem_1599711775943",
                        "type": "select",
                        "title": "Language",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "Conference Venue",
                "title_i18n": {
                    "en": "Conference Venue",
                    "ja": "開催会場"
                },
                "title_i18n_temp": {
                    "en": "Conference Venue",
                    "ja": "開催会場"
                }
            },
            {
                "add": "New",
                "key": "item_1617187187528[].subitem_1599711788485",
                "items": [
                    {
                        "key": "item_1617187187528[].subitem_1599711788485[].subitem_1599711798761",
                        "type": "text",
                        "title": "Conference Place",
                        "title_i18n": {
                            "en": "Conference Place",
                            "ja": "開催地"
                        },
                        "title_i18n_temp": {
                            "en": "Conference Place",
                            "ja": "開催地"
                        }
                    },
                    {
                        "key": "item_1617187187528[].subitem_1599711788485[].subitem_1599711803382",
                        "type": "select",
                        "title": "Language",
                        "titleMap": [
                            {
                                "name": "ja",
                                "value": "ja"
                            },
                            {
                                "name": "ja-Latn",
                                "value": "ja-Latn"
                            },
                            {
                                "name": "en",
                                "value": "en"
                            },
                            {
                                "name": "fr",
                                "value": "fr"
                            },
                            {
                                "name": "it",
                                "value": "it"
                            },
                            {
                                "name": "de",
                                "value": "de"
                            },
                            {
                                "name": "es",
                                "value": "es"
                            },
                            {
                                "name": "zh-cn",
                                "value": "zh-cn"
                            },
                            {
                                "name": "zh-tw",
                                "value": "zh-tw"
                            },
                            {
                                "name": "ru",
                                "value": "ru"
                            },
                            {
                                "name": "la",
                                "value": "la"
                            },
                            {
                                "name": "ms",
                                "value": "ms"
                            },
                            {
                                "name": "eo",
                                "value": "eo"
                            },
                            {
                                "name": "ar",
                                "value": "ar"
                            },
                            {
                                "name": "el",
                                "value": "el"
                            },
                            {
                                "name": "ko",
                                "value": "ko"
                            }
                        ],
                        "title_i18n": {
                            "en": "Language",
                            "ja": "言語"
                        },
                        "title_i18n_temp": {
                            "en": "Language",
                            "ja": "言語"
                        }
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "Conference Place",
                "title_i18n": {
                    "en": "Conference Place",
                    "ja": "開催地"
                },
                "title_i18n_temp": {
                    "en": "Conference Place",
                    "ja": "開催地"
                }
            },
            {
                "key": "item_1617187187528[].subitem_1599711813532",
                "type": "select",
                "title": "Conference Country",
                "titleMap": [
                    {
                        "name": "JPN",
                        "value": "JPN"
                    },
                    {
                        "name": "ABW",
                        "value": "ABW"
                    },
                    {
                        "name": "AFG",
                        "value": "AFG"
                    },
                    {
                        "name": "AGO",
                        "value": "AGO"
                    },
                    {
                        "name": "AIA",
                        "value": "AIA"
                    },
                    {
                        "name": "ALA",
                        "value": "ALA"
                    },
                    {
                        "name": "ALB",
                        "value": "ALB"
                    },
                    {
                        "name": "AND",
                        "value": "AND"
                    },
                    {
                        "name": "ARE",
                        "value": "ARE"
                    },
                    {
                        "name": "ARG",
                        "value": "ARG"
                    },
                    {
                        "name": "ARM",
                        "value": "ARM"
                    },
                    {
                        "name": "ASM",
                        "value": "ASM"
                    },
                    {
                        "name": "ATA",
                        "value": "ATA"
                    },
                    {
                        "name": "ATF",
                        "value": "ATF"
                    },
                    {
                        "name": "ATG",
                        "value": "ATG"
                    },
                    {
                        "name": "AUS",
                        "value": "AUS"
                    },
                    {
                        "name": "AUT",
                        "value": "AUT"
                    },
                    {
                        "name": "AZE",
                        "value": "AZE"
                    },
                    {
                        "name": "BDI",
                        "value": "BDI"
                    },
                    {
                        "name": "BEL",
                        "value": "BEL"
                    },
                    {
                        "name": "BEN",
                        "value": "BEN"
                    },
                    {
                        "name": "BES",
                        "value": "BES"
                    },
                    {
                        "name": "BFA",
                        "value": "BFA"
                    },
                    {
                        "name": "BGD",
                        "value": "BGD"
                    },
                    {
                        "name": "BGR",
                        "value": "BGR"
                    },
                    {
                        "name": "BHR",
                        "value": "BHR"
                    },
                    {
                        "name": "BHS",
                        "value": "BHS"
                    },
                    {
                        "name": "BIH",
                        "value": "BIH"
                    },
                    {
                        "name": "BLM",
                        "value": "BLM"
                    },
                    {
                        "name": "BLR",
                        "value": "BLR"
                    },
                    {
                        "name": "BLZ",
                        "value": "BLZ"
                    },
                    {
                        "name": "BMU",
                        "value": "BMU"
                    },
                    {
                        "name": "BOL",
                        "value": "BOL"
                    },
                    {
                        "name": "BRA",
                        "value": "BRA"
                    },
                    {
                        "name": "BRB",
                        "value": "BRB"
                    },
                    {
                        "name": "BRN",
                        "value": "BRN"
                    },
                    {
                        "name": "BTN",
                        "value": "BTN"
                    },
                    {
                        "name": "BVT",
                        "value": "BVT"
                    },
                    {
                        "name": "BWA",
                        "value": "BWA"
                    },
                    {
                        "name": "CAF",
                        "value": "CAF"
                    },
                    {
                        "name": "CAN",
                        "value": "CAN"
                    },
                    {
                        "name": "CCK",
                        "value": "CCK"
                    },
                    {
                        "name": "CHE",
                        "value": "CHE"
                    },
                    {
                        "name": "CHL",
                        "value": "CHL"
                    },
                    {
                        "name": "CHN",
                        "value": "CHN"
                    },
                    {
                        "name": "CIV",
                        "value": "CIV"
                    },
                    {
                        "name": "CMR",
                        "value": "CMR"
                    },
                    {
                        "name": "COD",
                        "value": "COD"
                    },
                    {
                        "name": "COG",
                        "value": "COG"
                    },
                    {
                        "name": "COK",
                        "value": "COK"
                    },
                    {
                        "name": "COL",
                        "value": "COL"
                    },
                    {
                        "name": "COM",
                        "value": "COM"
                    },
                    {
                        "name": "CPV",
                        "value": "CPV"
                    },
                    {
                        "name": "CRI",
                        "value": "CRI"
                    },
                    {
                        "name": "CUB",
                        "value": "CUB"
                    },
                    {
                        "name": "CUW",
                        "value": "CUW"
                    },
                    {
                        "name": "CXR",
                        "value": "CXR"
                    },
                    {
                        "name": "CYM",
                        "value": "CYM"
                    },
                    {
                        "name": "CYP",
                        "value": "CYP"
                    },
                    {
                        "name": "CZE",
                        "value": "CZE"
                    },
                    {
                        "name": "DEU",
                        "value": "DEU"
                    },
                    {
                        "name": "DJI",
                        "value": "DJI"
                    },
                    {
                        "name": "DMA",
                        "value": "DMA"
                    },
                    {
                        "name": "DNK",
                        "value": "DNK"
                    },
                    {
                        "name": "DOM",
                        "value": "DOM"
                    },
                    {
                        "name": "DZA",
                        "value": "DZA"
                    },
                    {
                        "name": "ECU",
                        "value": "ECU"
                    },
                    {
                        "name": "EGY",
                        "value": "EGY"
                    },
                    {
                        "name": "ERI",
                        "value": "ERI"
                    },
                    {
                        "name": "ESH",
                        "value": "ESH"
                    },
                    {
                        "name": "ESP",
                        "value": "ESP"
                    },
                    {
                        "name": "EST",
                        "value": "EST"
                    },
                    {
                        "name": "ETH",
                        "value": "ETH"
                    },
                    {
                        "name": "FIN",
                        "value": "FIN"
                    },
                    {
                        "name": "FJI",
                        "value": "FJI"
                    },
                    {
                        "name": "FLK",
                        "value": "FLK"
                    },
                    {
                        "name": "FRA",
                        "value": "FRA"
                    },
                    {
                        "name": "FRO",
                        "value": "FRO"
                    },
                    {
                        "name": "FSM",
                        "value": "FSM"
                    },
                    {
                        "name": "GAB",
                        "value": "GAB"
                    },
                    {
                        "name": "GBR",
                        "value": "GBR"
                    },
                    {
                        "name": "GEO",
                        "value": "GEO"
                    },
                    {
                        "name": "GGY",
                        "value": "GGY"
                    },
                    {
                        "name": "GHA",
                        "value": "GHA"
                    },
                    {
                        "name": "GIB",
                        "value": "GIB"
                    },
                    {
                        "name": "GIN",
                        "value": "GIN"
                    },
                    {
                        "name": "GLP",
                        "value": "GLP"
                    },
                    {
                        "name": "GMB",
                        "value": "GMB"
                    },
                    {
                        "name": "GNB",
                        "value": "GNB"
                    },
                    {
                        "name": "GNQ",
                        "value": "GNQ"
                    },
                    {
                        "name": "GRC",
                        "value": "GRC"
                    },
                    {
                        "name": "GRD",
                        "value": "GRD"
                    },
                    {
                        "name": "GRL",
                        "value": "GRL"
                    },
                    {
                        "name": "GTM",
                        "value": "GTM"
                    },
                    {
                        "name": "GUF",
                        "value": "GUF"
                    },
                    {
                        "name": "GUM",
                        "value": "GUM"
                    },
                    {
                        "name": "GUY",
                        "value": "GUY"
                    },
                    {
                        "name": "HKG",
                        "value": "HKG"
                    },
                    {
                        "name": "HMD",
                        "value": "HMD"
                    },
                    {
                        "name": "HND",
                        "value": "HND"
                    },
                    {
                        "name": "HRV",
                        "value": "HRV"
                    },
                    {
                        "name": "HTI",
                        "value": "HTI"
                    },
                    {
                        "name": "HUN",
                        "value": "HUN"
                    },
                    {
                        "name": "IDN",
                        "value": "IDN"
                    },
                    {
                        "name": "IMN",
                        "value": "IMN"
                    },
                    {
                        "name": "IND",
                        "value": "IND"
                    },
                    {
                        "name": "IOT",
                        "value": "IOT"
                    },
                    {
                        "name": "IRL",
                        "value": "IRL"
                    },
                    {
                        "name": "IRN",
                        "value": "IRN"
                    },
                    {
                        "name": "IRQ",
                        "value": "IRQ"
                    },
                    {
                        "name": "ISL",
                        "value": "ISL"
                    },
                    {
                        "name": "ISR",
                        "value": "ISR"
                    },
                    {
                        "name": "ITA",
                        "value": "ITA"
                    },
                    {
                        "name": "JAM",
                        "value": "JAM"
                    },
                    {
                        "name": "JEY",
                        "value": "JEY"
                    },
                    {
                        "name": "JOR",
                        "value": "JOR"
                    },
                    {
                        "name": "KAZ",
                        "value": "KAZ"
                    },
                    {
                        "name": "KEN",
                        "value": "KEN"
                    },
                    {
                        "name": "KGZ",
                        "value": "KGZ"
                    },
                    {
                        "name": "KHM",
                        "value": "KHM"
                    },
                    {
                        "name": "KIR",
                        "value": "KIR"
                    },
                    {
                        "name": "KNA",
                        "value": "KNA"
                    },
                    {
                        "name": "KOR",
                        "value": "KOR"
                    },
                    {
                        "name": "KWT",
                        "value": "KWT"
                    },
                    {
                        "name": "LAO",
                        "value": "LAO"
                    },
                    {
                        "name": "LBN",
                        "value": "LBN"
                    },
                    {
                        "name": "LBR",
                        "value": "LBR"
                    },
                    {
                        "name": "LBY",
                        "value": "LBY"
                    },
                    {
                        "name": "LCA",
                        "value": "LCA"
                    },
                    {
                        "name": "LIE",
                        "value": "LIE"
                    },
                    {
                        "name": "LKA",
                        "value": "LKA"
                    },
                    {
                        "name": "LSO",
                        "value": "LSO"
                    },
                    {
                        "name": "LTU",
                        "value": "LTU"
                    },
                    {
                        "name": "LUX",
                        "value": "LUX"
                    },
                    {
                        "name": "LVA",
                        "value": "LVA"
                    },
                    {
                        "name": "MAC",
                        "value": "MAC"
                    },
                    {
                        "name": "MAF",
                        "value": "MAF"
                    },
                    {
                        "name": "MAR",
                        "value": "MAR"
                    },
                    {
                        "name": "MCO",
                        "value": "MCO"
                    },
                    {
                        "name": "MDA",
                        "value": "MDA"
                    },
                    {
                        "name": "MDG",
                        "value": "MDG"
                    },
                    {
                        "name": "MDV",
                        "value": "MDV"
                    },
                    {
                        "name": "MEX",
                        "value": "MEX"
                    },
                    {
                        "name": "MHL",
                        "value": "MHL"
                    },
                    {
                        "name": "MKD",
                        "value": "MKD"
                    },
                    {
                        "name": "MLI",
                        "value": "MLI"
                    },
                    {
                        "name": "MLT",
                        "value": "MLT"
                    },
                    {
                        "name": "MMR",
                        "value": "MMR"
                    },
                    {
                        "name": "MNE",
                        "value": "MNE"
                    },
                    {
                        "name": "MNG",
                        "value": "MNG"
                    },
                    {
                        "name": "MNP",
                        "value": "MNP"
                    },
                    {
                        "name": "MOZ",
                        "value": "MOZ"
                    },
                    {
                        "name": "MRT",
                        "value": "MRT"
                    },
                    {
                        "name": "MSR",
                        "value": "MSR"
                    },
                    {
                        "name": "MTQ",
                        "value": "MTQ"
                    },
                    {
                        "name": "MUS",
                        "value": "MUS"
                    },
                    {
                        "name": "MWI",
                        "value": "MWI"
                    },
                    {
                        "name": "MYS",
                        "value": "MYS"
                    },
                    {
                        "name": "MYT",
                        "value": "MYT"
                    },
                    {
                        "name": "NAM",
                        "value": "NAM"
                    },
                    {
                        "name": "NCL",
                        "value": "NCL"
                    },
                    {
                        "name": "NER",
                        "value": "NER"
                    },
                    {
                        "name": "NFK",
                        "value": "NFK"
                    },
                    {
                        "name": "NGA",
                        "value": "NGA"
                    },
                    {
                        "name": "NIC",
                        "value": "NIC"
                    },
                    {
                        "name": "NIU",
                        "value": "NIU"
                    },
                    {
                        "name": "NLD",
                        "value": "NLD"
                    },
                    {
                        "name": "NOR",
                        "value": "NOR"
                    },
                    {
                        "name": "NPL",
                        "value": "NPL"
                    },
                    {
                        "name": "NRU",
                        "value": "NRU"
                    },
                    {
                        "name": "NZL",
                        "value": "NZL"
                    },
                    {
                        "name": "OMN",
                        "value": "OMN"
                    },
                    {
                        "name": "PAK",
                        "value": "PAK"
                    },
                    {
                        "name": "PAN",
                        "value": "PAN"
                    },
                    {
                        "name": "PCN",
                        "value": "PCN"
                    },
                    {
                        "name": "PER",
                        "value": "PER"
                    },
                    {
                        "name": "PHL",
                        "value": "PHL"
                    },
                    {
                        "name": "PLW",
                        "value": "PLW"
                    },
                    {
                        "name": "PNG",
                        "value": "PNG"
                    },
                    {
                        "name": "POL",
                        "value": "POL"
                    },
                    {
                        "name": "PRI",
                        "value": "PRI"
                    },
                    {
                        "name": "PRK",
                        "value": "PRK"
                    },
                    {
                        "name": "PRT",
                        "value": "PRT"
                    },
                    {
                        "name": "PRY",
                        "value": "PRY"
                    },
                    {
                        "name": "PSE",
                        "value": "PSE"
                    },
                    {
                        "name": "PYF",
                        "value": "PYF"
                    },
                    {
                        "name": "QAT",
                        "value": "QAT"
                    },
                    {
                        "name": "REU",
                        "value": "REU"
                    },
                    {
                        "name": "ROU",
                        "value": "ROU"
                    },
                    {
                        "name": "RUS",
                        "value": "RUS"
                    },
                    {
                        "name": "RWA",
                        "value": "RWA"
                    },
                    {
                        "name": "SAU",
                        "value": "SAU"
                    },
                    {
                        "name": "SDN",
                        "value": "SDN"
                    },
                    {
                        "name": "SEN",
                        "value": "SEN"
                    },
                    {
                        "name": "SGP",
                        "value": "SGP"
                    },
                    {
                        "name": "SGS",
                        "value": "SGS"
                    },
                    {
                        "name": "SHN",
                        "value": "SHN"
                    },
                    {
                        "name": "SJM",
                        "value": "SJM"
                    },
                    {
                        "name": "SLB",
                        "value": "SLB"
                    },
                    {
                        "name": "SLE",
                        "value": "SLE"
                    },
                    {
                        "name": "SLV",
                        "value": "SLV"
                    },
                    {
                        "name": "SMR",
                        "value": "SMR"
                    },
                    {
                        "name": "SOM",
                        "value": "SOM"
                    },
                    {
                        "name": "SPM",
                        "value": "SPM"
                    },
                    {
                        "name": "SRB",
                        "value": "SRB"
                    },
                    {
                        "name": "SSD",
                        "value": "SSD"
                    },
                    {
                        "name": "STP",
                        "value": "STP"
                    },
                    {
                        "name": "SUR",
                        "value": "SUR"
                    },
                    {
                        "name": "SVK",
                        "value": "SVK"
                    },
                    {
                        "name": "SVN",
                        "value": "SVN"
                    },
                    {
                        "name": "SWE",
                        "value": "SWE"
                    },
                    {
                        "name": "SWZ",
                        "value": "SWZ"
                    },
                    {
                        "name": "SXM",
                        "value": "SXM"
                    },
                    {
                        "name": "SYC",
                        "value": "SYC"
                    },
                    {
                        "name": "SYR",
                        "value": "SYR"
                    },
                    {
                        "name": "TCA",
                        "value": "TCA"
                    },
                    {
                        "name": "TCD",
                        "value": "TCD"
                    },
                    {
                        "name": "TGO",
                        "value": "TGO"
                    },
                    {
                        "name": "THA",
                        "value": "THA"
                    },
                    {
                        "name": "TJK",
                        "value": "TJK"
                    },
                    {
                        "name": "TKL",
                        "value": "TKL"
                    },
                    {
                        "name": "TKM",
                        "value": "TKM"
                    },
                    {
                        "name": "TLS",
                        "value": "TLS"
                    },
                    {
                        "name": "TON",
                        "value": "TON"
                    },
                    {
                        "name": "TTO",
                        "value": "TTO"
                    },
                    {
                        "name": "TUN",
                        "value": "TUN"
                    },
                    {
                        "name": "TUR",
                        "value": "TUR"
                    },
                    {
                        "name": "TUV",
                        "value": "TUV"
                    },
                    {
                        "name": "TWN",
                        "value": "TWN"
                    },
                    {
                        "name": "TZA",
                        "value": "TZA"
                    },
                    {
                        "name": "UGA",
                        "value": "UGA"
                    },
                    {
                        "name": "UKR",
                        "value": "UKR"
                    },
                    {
                        "name": "UMI",
                        "value": "UMI"
                    },
                    {
                        "name": "URY",
                        "value": "URY"
                    },
                    {
                        "name": "USA",
                        "value": "USA"
                    },
                    {
                        "name": "UZB",
                        "value": "UZB"
                    },
                    {
                        "name": "VAT",
                        "value": "VAT"
                    },
                    {
                        "name": "VCT",
                        "value": "VCT"
                    },
                    {
                        "name": "VEN",
                        "value": "VEN"
                    },
                    {
                        "name": "VGB",
                        "value": "VGB"
                    },
                    {
                        "name": "VIR",
                        "value": "VIR"
                    },
                    {
                        "name": "VNM",
                        "value": "VNM"
                    },
                    {
                        "name": "VUT",
                        "value": "VUT"
                    },
                    {
                        "name": "WLF",
                        "value": "WLF"
                    },
                    {
                        "name": "WSM",
                        "value": "WSM"
                    },
                    {
                        "name": "YEM",
                        "value": "YEM"
                    },
                    {
                        "name": "ZAF",
                        "value": "ZAF"
                    },
                    {
                        "name": "ZMB",
                        "value": "ZMB"
                    },
                    {
                        "name": "ZWE",
                        "value": "ZWE"
                    }
                ],
                "title_i18n": {
                    "en": "Conference Country",
                    "ja": "開催国"
                },
                "title_i18n_temp": {
                    "en": "Conference Country",
                    "ja": "開催国"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Conference",
        "title_i18n": {
            "en": "Conference",
            "ja": "会議記述"
        }
    },
    {
        "add": "New",
        "key": "item_1617620223087",
        "items": [
            {
                "key": "item_1617620223087[].subitem_1565671149650",
                "type": "select",
                "title": "Language",
                "titleMap": [
                    {
                        "name": "ja",
                        "value": "ja"
                    },
                    {
                        "name": "ja-Kana",
                        "value": "ja-Kana"
                    },
                    {
                        "name": "ja-Latn",
                        "value": "ja-Latn"
                    },
                    {
                        "name": "en",
                        "value": "en"
                    },
                    {
                        "name": "fr",
                        "value": "fr"
                    },
                    {
                        "name": "it",
                        "value": "it"
                    },
                    {
                        "name": "de",
                        "value": "de"
                    },
                    {
                        "name": "es",
                        "value": "es"
                    },
                    {
                        "name": "zh-cn",
                        "value": "zh-cn"
                    },
                    {
                        "name": "zh-tw",
                        "value": "zh-tw"
                    },
                    {
                        "name": "ru",
                        "value": "ru"
                    },
                    {
                        "name": "la",
                        "value": "la"
                    },
                    {
                        "name": "ms",
                        "value": "ms"
                    },
                    {
                        "name": "eo",
                        "value": "eo"
                    },
                    {
                        "name": "ar",
                        "value": "ar"
                    },
                    {
                        "name": "el",
                        "value": "el"
                    },
                    {
                        "name": "ko",
                        "value": "ko"
                    }
                ],
                "title_i18n": {
                    "en": "Language",
                    "ja": "言語"
                },
                "title_i18n_temp": {
                    "en": "Language",
                    "ja": "言語"
                }
            },
            {
                "key": "item_1617620223087[].subitem_1565671169640",
                "type": "text",
                "title": "Banner Headline",
                "title_i18n": {
                    "en": "Banner Headline",
                    "ja": "大見出し"
                },
                "title_i18n_temp": {
                    "en": "Banner Headline",
                    "ja": "大見出し"
                }
            },
            {
                "key": "item_1617620223087[].subitem_1565671178623",
                "type": "text",
                "title": "Subheading",
                "title_i18n": {
                    "en": "Subheading",
                    "ja": "小見出し"
                },
                "title_i18n_temp": {
                    "en": "Subheading",
                    "ja": "小見出し"
                }
            }
        ],
        "style": {
            "add": "btn-success"
        },
        "title": "Heading",
        "title_i18n": {
            "en": "Heading",
            "ja": "見出し"
        }
    },
    {
        "key": "system_identifier_doi",
        "type": "fieldset",
        "items": [
            {
                "key": "parentkey.subitem_systemidt_identifier",
                "type": "text",
                "title": "SYSTEMIDT Identifier"
            },
            {
                "key": "parentkey.subitem_systemidt_identifier_type",
                "type": "select",
                "title": "SYSTEMIDT Identifier Type",
                "titleMap": [
                    {
                        "name": "DOI",
                        "value": "DOI"
                    },
                    {
                        "name": "HDL",
                        "value": "HDL"
                    },
                    {
                        "name": "URI",
                        "value": "URI"
                    }
                ]
            }
        ],
        "title": "Persistent Identifier(DOI)",
        "title_i18n": {
            "en": "Persistent Identifier(DOI)",
            "ja": "永続識別子（DOI）"
        }
    },
    {
        "key": "system_identifier_hdl",
        "type": "fieldset",
        "items": [
            {
                "key": "parentkey.subitem_systemidt_identifier",
                "type": "text",
                "title": "SYSTEMIDT Identifier"
            },
            {
                "key": "parentkey.subitem_systemidt_identifier_type",
                "type": "select",
                "title": "SYSTEMIDT Identifier Type",
                "titleMap": [
                    {
                        "name": "DOI",
                        "value": "DOI"
                    },
                    {
                        "name": "HDL",
                        "value": "HDL"
                    },
                    {
                        "name": "URI",
                        "value": "URI"
                    }
                ]
            }
        ],
        "title": "Persistent Identifier(HDL)",
        "title_i18n": {
            "en": "Persistent Identifier(HDL)",
            "ja": "永続識別子（HDL）"
        }
    },
    {
        "key": "system_identifier_uri",
        "type": "fieldset",
        "items": [
            {
                "key": "parentkey.subitem_systemidt_identifier",
                "type": "text",
                "title": "SYSTEMIDT Identifier"
            },
            {
                "key": "parentkey.subitem_systemidt_identifier_type",
                "type": "select",
                "title": "SYSTEMIDT Identifier Type",
                "titleMap": [
                    {
                        "name": "DOI",
                        "value": "DOI"
                    },
                    {
                        "name": "HDL",
                        "value": "HDL"
                    },
                    {
                        "name": "URI",
                        "value": "URI"
                    }
                ]
            }
        ],
        "title": "Persistent Identifier(URI)",
        "title_i18n": {
            "en": "Persistent Identifier(URI)",
            "ja": "永続識別子（URI）"
        }
    },
    {
        "key": "system_file",
        "type": "fieldset",
        "items": [
            {
                "add": "New",
                "key": "parentkey.subitem_systemfile_filename",
                "items": [
                    {
                        "key": "parentkey.subitem_systemfile_filename[].subitem_systemfile_filename_label",
                        "type": "text",
                        "title": "SYSTEMFILE Filename Label"
                    },
                    {
                        "key": "parentkey.subitem_systemfile_filename[].subitem_systemfile_filename_type",
                        "type": "select",
                        "title": "SYSTEMFILE Filename Type",
                        "titleMap": [
                            {
                                "name": "Abstract",
                                "value": "Abstract"
                            },
                            {
                                "name": "Fulltext",
                                "value": "Fulltext"
                            },
                            {
                                "name": "Summary",
                                "value": "Summary"
                            },
                            {
                                "name": "Thumbnail",
                                "value": "Thumbnail"
                            },
                            {
                                "name": "Other",
                                "value": "Other"
                            }
                        ]
                    },
                    {
                        "key": "parentkey.subitem_systemfile_filename[].subitem_systemfile_filename_uri",
                        "type": "text",
                        "title": "SYSTEMFILE Filename URI"
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "SYSTEMFILE Filename"
            },
            {
                "key": "parentkey.subitem_systemfile_mimetype",
                "type": "text",
                "title": "SYSTEMFILE MimeType"
            },
            {
                "key": "parentkey.subitem_systemfile_size",
                "type": "text",
                "title": "SYSTEMFILE Size"
            },
            {
                "add": "New",
                "key": "parentkey.subitem_systemfile_datetime",
                "items": [
                    {
                        "key": "parentkey.subitem_systemfile_datetime[].subitem_systemfile_datetime_date",
                        "type": "template",
                        "title": "SYSTEMFILE DateTime Date",
                        "format": "yyyy-MM-dd",
                        "templateUrl": "/static/templates/weko_deposit/datepicker.html"
                    },
                    {
                        "key": "parentkey.subitem_systemfile_datetime[].subitem_systemfile_datetime_type",
                        "type": "select",
                        "title": "SYSTEMFILE DateTime Type",
                        "titleMap": [
                            {
                                "name": "Accepted",
                                "value": "Accepted"
                            },
                            {
                                "name": "Available",
                                "value": "Available"
                            },
                            {
                                "name": "Collected",
                                "value": "Collected"
                            },
                            {
                                "name": "Copyrighted",
                                "value": "Copyrighted"
                            },
                            {
                                "name": "Created",
                                "value": "Created"
                            },
                            {
                                "name": "Issued",
                                "value": "Issued"
                            },
                            {
                                "name": "Submitted",
                                "value": "Submitted"
                            },
                            {
                                "name": "Updated",
                                "value": "Updated"
                            },
                            {
                                "name": "Valid",
                                "value": "Valid"
                            }
                        ]
                    }
                ],
                "style": {
                    "add": "btn-success"
                },
                "title": "SYSTEMFILE DateTime"
            },
            {
                "key": "parentkey.subitem_systemfile_version",
                "type": "text",
                "title": "SYSTEMFILE Version"
            }
        ],
        "title": "File Information",
        "title_i18n": {
            "en": "File Information",
            "ja": "ファイル情報"
        }
    }
];

const schema = {
    "type": "object",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "required": [
        "pubdate",
        "item_1617186331708",
        "item_1617258105262"
    ],
    "properties": {
        "pubdate": {
            "type": "string",
            "title": "PubDate",
            "format": "datetime"
        },
        "system_file": {
            "type": "object",
            "title": "File Information",
            "format": "object",
            "properties": {
                "subitem_systemfile_size": {
                    "type": "string",
                    "title": "SYSTEMFILE Size",
                    "format": "text"
                },
                "subitem_systemfile_version": {
                    "type": "string",
                    "title": "SYSTEMFILE Version",
                    "format": "text"
                },
                "subitem_systemfile_datetime": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "format": "object",
                        "properties": {
                            "subitem_systemfile_datetime_date": {
                                "type": "string",
                                "title": "SYSTEMFILE DateTime Date",
                                "format": "datetime"
                            },
                            "subitem_systemfile_datetime_type": {
                                "enum": [
                                    "Accepted",
                                    "Available",
                                    "Collected",
                                    "Copyrighted",
                                    "Created",
                                    "Issued",
                                    "Submitted",
                                    "Updated",
                                    "Valid"
                                ],
                                "type": "string",
                                "title": "SYSTEMFILE DateTime Type",
                                "format": "select"
                            }
                        }
                    },
                    "title": "SYSTEMFILE DateTime",
                    "format": "array"
                },
                "subitem_systemfile_filename": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "format": "object",
                        "properties": {
                            "subitem_systemfile_filename_uri": {
                                "type": "string",
                                "title": "SYSTEMFILE Filename URI",
                                "format": "text"
                            },
                            "subitem_systemfile_filename_type": {
                                "enum": [
                                    "Abstract",
                                    "Fulltext",
                                    "Summary",
                                    "Thumbnail",
                                    "Other"
                                ],
                                "type": "string",
                                "title": "SYSTEMFILE Filename Type",
                                "format": "select"
                            },
                            "subitem_systemfile_filename_label": {
                                "type": "string",
                                "title": "SYSTEMFILE Filename Label",
                                "format": "text"
                            }
                        }
                    },
                    "title": "SYSTEMFILE Filename",
                    "format": "array"
                },
                "subitem_systemfile_mimetype": {
                    "type": "string",
                    "title": "SYSTEMFILE MimeType",
                    "format": "text"
                }
            },
            "system_prop": true
        },
        "item_1617186331708": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "subitem_1551255647225",
                    "subitem_1551255648112"
                ],
                "properties": {
                    "subitem_1551255647225": {
                        "type": "string",
                        "title": "Title",
                        "format": "text",
                        "title_i18n": {
                            "en": "Title",
                            "ja": "タイトル"
                        },
                        "title_i18n_temp": {
                            "en": "Title",
                            "ja": "タイトル"
                        }
                    },
                    "subitem_1551255648112": {
                        "enum": [
                            null,
                            "ja",
                            "ja-Kana",
                            "ja-Latn",
                            "en",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "Language",
                        "format": "select",
                        "currentEnum": [
                            "ja",
                            "ja-Kana",
                            "en",
                            "ja-Latn",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ]
                    }
                }
            },
            "title": "Title",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617186385884": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_1551255720400": {
                        "type": "string",
                        "title": "Alternative Title",
                        "format": "text",
                        "title_i18n": {
                            "en": "Alternative Title",
                            "ja": "その他のタイトル"
                        },
                        "title_i18n_temp": {
                            "en": "Alternative Title",
                            "ja": "その他のタイトル"
                        }
                    },
                    "subitem_1551255721061": {
                        "enum": [
                            null,
                            "ja",
                            "ja-Kana",
                            "ja-Latn",
                            "en",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "Language",
                        "format": "select",
                        "currentEnum": [
                            "ja",
                            "ja-Kana",
                            "en",
                            "ja-Latn",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ]
                    }
                }
            },
            "title": "Alternative Title",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617186419668": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "iscreator": {
                        "type": "string",
                        "title": "iscreator",
                        "format": "text",
                        "uniqueKey": "item_1617186419668_iscreator",
                        "title_i18n": {
                            "en": "",
                            "ja": ""
                        }
                    },
                    "givenNames": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "givenName": {
                                    "type": "string",
                                    "title": "名",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Given Name",
                                        "ja": "名"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Given Name",
                                        "ja": "名"
                                    }
                                },
                                "givenNameLang": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Kana",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "言語",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "ja-Kana",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                }
                            }
                        },
                        "title": "作成者名",
                        "format": "array"
                    },
                    "familyNames": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "familyName": {
                                    "type": "string",
                                    "title": "姓",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Family Name",
                                        "ja": "姓"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Family Name",
                                        "ja": "姓"
                                    }
                                },
                                "familyNameLang": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Kana",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "言語",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "ja-Kana",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                }
                            }
                        },
                        "title": "作成者姓",
                        "format": "array"
                    },
                    "creatorMails": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "creatorMail": {
                                    "type": "string",
                                    "title": "メールアドレス",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Email Address",
                                        "ja": "メールアドレス"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Email Address",
                                        "ja": "メールアドレス"
                                    }
                                }
                            }
                        },
                        "title": "作成者メールアドレス",
                        "format": "array"
                    },
                    "creatorNames": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "creatorName": {
                                    "type": "string",
                                    "title": "姓名",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Name",
                                        "ja": "姓名"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Name",
                                        "ja": "姓名"
                                    }
                                },
                                "creatorNameLang": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Kana",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "言語",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "ja-Kana",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                }
                            }
                        },
                        "title": "作成者姓名",
                        "format": "array"
                    },
                    "nameIdentifiers": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "nameIdentifier": {
                                    "type": "string",
                                    "title": "作成者識別子",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Creator Identifier",
                                        "ja": "作成者識別子"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Creator Identifier",
                                        "ja": "作成者識別子"
                                    }
                                },
                                "nameIdentifierURI": {
                                    "type": "string",
                                    "title": "作成者識別子URI",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Creator Identifier URI",
                                        "ja": "作成者識別子URI"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Creator Identifier URI",
                                        "ja": "作成者識別子URI"
                                    }
                                },
                                "nameIdentifierScheme": {
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "作成者識別子Scheme",
                                    "format": "select",
                                    "currentEnum": []
                                }
                            }
                        },
                        "title": "作成者識別子",
                        "format": "array"
                    },
                    "creatorAffiliations": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "affiliationNames": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "format": "object",
                                        "properties": {
                                            "affiliationName": {
                                                "type": "string",
                                                "title": "所属機関名",
                                                "format": "text",
                                                "title_i18n": {
                                                    "en": "Affiliation Name",
                                                    "ja": "所属機関名"
                                                },
                                                "title_i18n_temp": {
                                                    "en": "Affiliation Name",
                                                    "ja": "所属機関名"
                                                }
                                            },
                                            "affiliationNameLang": {
                                                "enum": [
                                                    null,
                                                    "ja",
                                                    "ja-Kana",
                                                    "ja-Latn",
                                                    "en",
                                                    "fr",
                                                    "it",
                                                    "de",
                                                    "es",
                                                    "zh-cn",
                                                    "zh-tw",
                                                    "ru",
                                                    "la",
                                                    "ms",
                                                    "eo",
                                                    "ar",
                                                    "el",
                                                    "ko"
                                                ],
                                                "type": [
                                                    "null",
                                                    "string"
                                                ],
                                                "title": "言語",
                                                "format": "select",
                                                "currentEnum": [
                                                    "ja",
                                                    "ja-Kana",
                                                    "en",
                                                    "ja-Latn",
                                                    "fr",
                                                    "it",
                                                    "de",
                                                    "es",
                                                    "zh-cn",
                                                    "zh-tw",
                                                    "ru",
                                                    "la",
                                                    "ms",
                                                    "eo",
                                                    "ar",
                                                    "el",
                                                    "ko"
                                                ]
                                            }
                                        }
                                    },
                                    "title": "所属機関名",
                                    "format": "array"
                                },
                                "affiliationNameIdentifiers": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "format": "object",
                                        "properties": {
                                            "affiliationNameIdentifier": {
                                                "type": "string",
                                                "title": "所属機関識別子",
                                                "format": "text",
                                                "title_i18n": {
                                                    "en": "Affiliation Name Identifier",
                                                    "ja": "所属機関識別子"
                                                },
                                                "title_i18n_temp": {
                                                    "en": "Affiliation Name Identifier",
                                                    "ja": "所属機関識別子"
                                                }
                                            },
                                            "affiliationNameIdentifierURI": {
                                                "type": "string",
                                                "title": "所属機関識別子URI",
                                                "format": "text",
                                                "title_i18n": {
                                                    "en": "Affiliation Name Identifier URI",
                                                    "ja": "所属機関識別子URI"
                                                },
                                                "title_i18n_temp": {
                                                    "en": "Affiliation Name Identifier URI",
                                                    "ja": "所属機関識別子URI"
                                                }
                                            },
                                            "affiliationNameIdentifierScheme": {
                                                "enum": [
                                                    null,
                                                    "kakenhi",
                                                    "ISNI",
                                                    "Ringgold",
                                                    "GRID"
                                                ],
                                                "type": [
                                                    "null",
                                                    "string"
                                                ],
                                                "title": "所属機関識別子スキーマ",
                                                "format": "select",
                                                "currentEnum": [
                                                    "kakenhi",
                                                    "ISNI",
                                                    "Ringgold",
                                                    "GRID"
                                                ]
                                            }
                                        }
                                    },
                                    "title": "所属機関識別子",
                                    "format": "array"
                                }
                            }
                        },
                        "title": "作成者所属",
                        "format": "array"
                    },
                    "creatorAlternatives": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "creatorAlternative": {
                                    "type": "string",
                                    "title": "別名",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Alternative Name",
                                        "ja": "別名"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Alternative Name",
                                        "ja": "別名"
                                    }
                                },
                                "creatorAlternativeLang": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Kana",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "言語",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "ja-Kana",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                }
                            }
                        },
                        "title": "作成者別名",
                        "format": "array"
                    }
                }
            },
            "title": "Creator",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617186476635": {
            "type": "object",
            "title": "Access Rights",
            "properties": {
                "subitem_1522299639480": {
                    "enum": [
                        null,
                        "embargoed access",
                        "metadata only access",
                        "open access",
                        "restricted access"
                    ],
                    "type": [
                        "null",
                        "string"
                    ],
                    "title": "アクセス権",
                    "format": "select",
                    "currentEnum": [
                        "embargoed access",
                        "metadata only access",
                        "open access",
                        "restricted access"
                    ]
                },
                "subitem_1600958577026": {
                    "type": "string",
                    "title": "アクセス権URI",
                    "format": "text",
                    "title_i18n": {
                        "en": "Access Rights URI",
                        "ja": "アクセス権URI"
                    },
                    "title_i18n_temp": {
                        "en": "Access Rights URI",
                        "ja": "アクセス権URI"
                    }
                }
            }
        },
        "item_1617186499011": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_1522650717957": {
                        "enum": [
                            null,
                            "ja",
                            "ja-Latn",
                            "en",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "言語",
                        "format": "select",
                        "currentEnum": [
                            "ja",
                            "en",
                            "ja-Latn",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ]
                    },
                    "subitem_1522650727486": {
                        "type": "string",
                        "title": "権利情報Resource",
                        "format": "text",
                        "title_i18n": {
                            "en": "Rights Information Resource",
                            "ja": "権利情報Resource"
                        },
                        "title_i18n_temp": {
                            "en": "Rights Information Resource",
                            "ja": "権利情報Resource"
                        }
                    },
                    "subitem_1522651041219": {
                        "type": "string",
                        "title": "権利情報",
                        "format": "text",
                        "title_i18n": {
                            "en": "Rights Information",
                            "ja": "権利情報"
                        },
                        "title_i18n_temp": {
                            "en": "Rights Information",
                            "ja": "権利情報"
                        }
                    }
                }
            },
            "title": "Rights",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617186609386": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_1522299896455": {
                        "enum": [
                            null,
                            "ja",
                            "ja-Kana",
                            "ja-Latn",
                            "en",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "言語",
                        "format": "select",
                        "currentEnum": [
                            "ja",
                            "ja-Kana",
                            "en",
                            "ja-Latn",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ]
                    },
                    "subitem_1522300014469": {
                        "enum": [
                            null,
                            "BSH",
                            "DDC",
                            "LCC",
                            "LCSH",
                            "MeSH",
                            "NDC",
                            "NDLC",
                            "NDLSH",
                            "SciVal",
                            "UDC",
                            "Other"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "主題Scheme",
                        "format": "select",
                        "currentEnum": [
                            "BSH",
                            "DDC",
                            "LCC",
                            "LCSH",
                            "MeSH",
                            "NDC",
                            "NDLC",
                            "NDLSH",
                            "SciVal",
                            "UDC",
                            "Other"
                        ]
                    },
                    "subitem_1522300048512": {
                        "type": "string",
                        "title": "主題URI",
                        "format": "text",
                        "title_i18n": {
                            "en": "Subject URI",
                            "ja": "主題URI"
                        },
                        "title_i18n_temp": {
                            "en": "Subject URI",
                            "ja": "主題URI"
                        }
                    },
                    "subitem_1523261968819": {
                        "type": "string",
                        "title": "主題",
                        "format": "text",
                        "title_i18n": {
                            "en": "Subject",
                            "ja": "主題"
                        },
                        "title_i18n_temp": {
                            "en": "Subject",
                            "ja": "主題"
                        }
                    }
                }
            },
            "title": "Subject",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617186626617": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_description": {
                        "type": "string",
                        "title": "内容記述",
                        "format": "textarea",
                        "title_i18n": {
                            "en": "Description",
                            "ja": "内容記述"
                        },
                        "title_i18n_temp": {
                            "en": "Description",
                            "ja": "内容記述"
                        }
                    },
                    "subitem_description_type": {
                        "enum": [
                            null,
                            "Abstract",
                            "Methods",
                            "TableOfContents",
                            "TechnicalInfo",
                            "Other"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "内容記述タイプ",
                        "format": "select",
                        "currentEnum": [
                            "Abstract",
                            "Methods",
                            "TableOfContents",
                            "TechnicalInfo",
                            "Other"
                        ]
                    },
                    "subitem_description_language": {
                        "enum": [
                            null,
                            "ja",
                            "ja-Latn",
                            "en",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "言語",
                        "format": "select",
                        "currentEnum": [
                            "ja",
                            "en",
                            "ja-Latn",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ]
                    }
                }
            },
            "title": "Description",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617186643794": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_1522300295150": {
                        "enum": [
                            null,
                            "ja",
                            "ja-Latn",
                            "en",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "言語",
                        "format": "select",
                        "currentEnum": [
                            "ja",
                            "en",
                            "ja-Latn",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ]
                    },
                    "subitem_1522300316516": {
                        "type": "string",
                        "title": "出版者",
                        "format": "text",
                        "title_i18n": {
                            "en": "Publisher",
                            "ja": "出版者"
                        },
                        "title_i18n_temp": {
                            "en": "Publisher",
                            "ja": "出版者"
                        }
                    }
                }
            },
            "title": "Publisher",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617186660861": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_1522300695726": {
                        "enum": [
                            null,
                            "Accepted",
                            "Available",
                            "Collected",
                            "Copyrighted",
                            "Created",
                            "Issued",
                            "Submitted",
                            "Updated",
                            "Valid"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "日付タイプ",
                        "format": "select",
                        "currentEnum": [
                            "Accepted",
                            "Available",
                            "Collected",
                            "Copyrighted",
                            "Created",
                            "Issued",
                            "Submitted",
                            "Updated",
                            "Valid"
                        ]
                    },
                    "subitem_1522300722591": {
                        "type": "string",
                        "title": "日付",
                        "format": "datetime",
                        "title_i18n": {
                            "en": "Date",
                            "ja": "日付"
                        },
                        "title_i18n_temp": {
                            "en": "Date",
                            "ja": "日付"
                        }
                    }
                }
            },
            "title": "Date",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617186702042": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_1551255818386": {
                        "enum": [
                            null,
                            "jpn",
                            "eng",
                            "fra",
                            "ita",
                            "spa",
                            "zho",
                            "rus",
                            "lat",
                            "msa",
                            "epo",
                            "ara",
                            "ell",
                            "kor"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "Language",
                        "format": "select",
                        "currentEnum": [
                            "jpn",
                            "eng",
                            "fra",
                            "ita",
                            "spa",
                            "zho",
                            "rus",
                            "lat",
                            "msa",
                            "epo",
                            "ara",
                            "ell",
                            "kor"
                        ]
                    }
                }
            },
            "title": "Language",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617186783814": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_identifier_uri": {
                        "type": "string",
                        "title": "識別子",
                        "format": "text",
                        "title_i18n": {
                            "en": "Identifier",
                            "ja": "識別子"
                        },
                        "title_i18n_temp": {
                            "en": "Identifier",
                            "ja": "識別子"
                        }
                    },
                    "subitem_identifier_type": {
                        "enum": [
                            null,
                            "DOI",
                            "HDL",
                            "URI"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "識別子タイプ",
                        "format": "select",
                        "currentEnum": [
                            "DOI",
                            "HDL",
                            "URI"
                        ]
                    }
                }
            },
            "title": "Identifier",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617186819068": {
            "type": "object",
            "title": "Identifier Registration",
            "properties": {
                "subitem_identifier_reg_text": {
                    "type": "string",
                    "title": "ID登録",
                    "format": "text",
                    "title_i18n": {
                        "en": "Identifier Registration",
                        "ja": "ID登録"
                    },
                    "title_i18n_temp": {
                        "en": "Identifier Registration",
                        "ja": "ID登録"
                    }
                },
                "subitem_identifier_reg_type": {
                    "enum": [
                        null,
                        "JaLC",
                        "Crossref",
                        "DataCite",
                        "PMID【現在不使用】"
                    ],
                    "type": [
                        "null",
                        "string"
                    ],
                    "title": "ID登録タイプ",
                    "format": "select",
                    "currentEnum": [
                        "JaLC",
                        "Crossref",
                        "DataCite",
                        "PMID"
                    ]
                }
            }
        },
        "item_1617186859717": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_1522658018441": {
                        "enum": [
                            null,
                            "ja",
                            "ja-Latn",
                            "en",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "言語",
                        "format": "select",
                        "currentEnum": [
                            "ja",
                            "en",
                            "ja-Latn",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ]
                    },
                    "subitem_1522658031721": {
                        "type": "string",
                        "title": "時間的範囲",
                        "format": "text",
                        "title_i18n": {
                            "en": "Temporal",
                            "ja": "時間的範囲"
                        },
                        "title_i18n_temp": {
                            "en": "Temporal",
                            "ja": "時間的範囲"
                        }
                    }
                }
            },
            "title": "Temporal",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617186882738": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_geolocation_box": {
                        "type": "object",
                        "title": "位置情報（空間）",
                        "format": "object",
                        "properties": {
                            "subitem_east_longitude": {
                                "type": "string",
                                "title": "東部経度",
                                "format": "text",
                                "title_i18n": {
                                    "en": "East Bound Longitude",
                                    "ja": "東部経度"
                                },
                                "title_i18n_temp": {
                                    "en": "East Bound Longitude",
                                    "ja": "東部経度"
                                }
                            },
                            "subitem_north_latitude": {
                                "type": "string",
                                "title": "北部緯度",
                                "format": "text",
                                "title_i18n": {
                                    "en": "North Bound Latitude",
                                    "ja": "北部緯度"
                                },
                                "title_i18n_temp": {
                                    "en": "North Bound Latitude",
                                    "ja": "北部緯度"
                                }
                            },
                            "subitem_south_latitude": {
                                "type": "string",
                                "title": "南部緯度",
                                "format": "text",
                                "title_i18n": {
                                    "en": "South Bound Latitude",
                                    "ja": "南部緯度"
                                },
                                "title_i18n_temp": {
                                    "en": "South Bound Latitude",
                                    "ja": "南部緯度"
                                }
                            },
                            "subitem_west_longitude": {
                                "type": "string",
                                "title": "西部経度",
                                "format": "text",
                                "title_i18n": {
                                    "en": "West Bound Longitude",
                                    "ja": "西部経度"
                                },
                                "title_i18n_temp": {
                                    "en": "West Bound Longitude",
                                    "ja": "西部経度"
                                }
                            }
                        }
                    },
                    "subitem_geolocation_place": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "subitem_geolocation_place_text": {
                                    "type": "string",
                                    "title": "位置情報（自由記述）",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Geo Location Place",
                                        "ja": "位置情報（自由記述）"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Geo Location Place",
                                        "ja": "位置情報（自由記述）"
                                    }
                                }
                            }
                        },
                        "title": "位置情報（自由記述）",
                        "format": "array"
                    },
                    "subitem_geolocation_point": {
                        "type": "object",
                        "title": "位置情報（点）",
                        "format": "object",
                        "properties": {
                            "subitem_point_latitude": {
                                "type": "string",
                                "title": "緯度",
                                "format": "text",
                                "title_i18n": {
                                    "en": "Point Latitude",
                                    "ja": "緯度"
                                },
                                "title_i18n_temp": {
                                    "en": "Point Latitude",
                                    "ja": "緯度"
                                }
                            },
                            "subitem_point_longitude": {
                                "type": "string",
                                "title": "経度",
                                "format": "text",
                                "title_i18n": {
                                    "en": "Point Longitude",
                                    "ja": "経度"
                                },
                                "title_i18n_temp": {
                                    "en": "Point Longitude",
                                    "ja": "経度"
                                }
                            }
                        }
                    }
                }
            },
            "title": "Geo Location",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617186901218": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_1522399143519": {
                        "type": "object",
                        "title": "助成機関識別子",
                        "format": "object",
                        "properties": {
                            "subitem_1522399281603": {
                                "enum": [
                                    null,
                                    "Crossref Funder",
                                    "GRID",
                                    "ISNI",
                                    "Other",
                                    "kakenhi"
                                ],
                                "type": [
                                    "null",
                                    "string"
                                ],
                                "title": "助成機関識別子タイプ",
                                "format": "select",
                                "currentEnum": [
                                    "Crossref Funder",
                                    "GRID",
                                    "ISNI",
                                    "Other",
                                    "kakenhi"
                                ]
                            },
                            "subitem_1522399333375": {
                                "type": "string",
                                "title": "助成機関識別子",
                                "format": "text",
                                "title_i18n": {
                                    "en": "Funder Identifier",
                                    "ja": "助成機関識別子"
                                },
                                "title_i18n_temp": {
                                    "en": "Funder Identifier",
                                    "ja": "助成機関識別子"
                                }
                            }
                        }
                    },
                    "subitem_1522399412622": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "subitem_1522399416691": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "言語",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                },
                                "subitem_1522737543681": {
                                    "type": "string",
                                    "title": "助成機関名",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Funder Name",
                                        "ja": "助成機関名"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Funder Name",
                                        "ja": "助成機関名"
                                    }
                                }
                            }
                        },
                        "title": "助成機関名",
                        "format": "array"
                    },
                    "subitem_1522399571623": {
                        "type": "object",
                        "title": "研究課題番号",
                        "format": "object",
                        "properties": {
                            "subitem_1522399585738": {
                                "type": "string",
                                "title": "研究課題URI",
                                "format": "text",
                                "title_i18n": {
                                    "en": "Award URI",
                                    "ja": "研究課題URI"
                                },
                                "title_i18n_temp": {
                                    "en": "Award URI",
                                    "ja": "研究課題URI"
                                }
                            },
                            "subitem_1522399628911": {
                                "type": "string",
                                "title": "研究課題番号",
                                "format": "text",
                                "title_i18n": {
                                    "en": "Award Number",
                                    "ja": "研究課題番号"
                                },
                                "title_i18n_temp": {
                                    "en": "Award Number",
                                    "ja": "研究課題番号"
                                }
                            }
                        }
                    },
                    "subitem_1522399651758": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "subitem_1522721910626": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "言語",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                },
                                "subitem_1522721929892": {
                                    "type": "string",
                                    "title": "研究課題名",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Award Title",
                                        "ja": "研究課題名"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Award Title",
                                        "ja": "研究課題名"
                                    }
                                }
                            }
                        },
                        "title": "研究課題名",
                        "format": "array"
                    }
                }
            },
            "title": "Funding Reference",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617186920753": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_1522646500366": {
                        "enum": [
                            null,
                            "PISSN",
                            "EISSN",
                            "ISSN",
                            "NCID"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "収録物識別子タイプ",
                        "format": "select",
                        "currentEnum": [
                            "PISSN",
                            "EISSN",
                            "ISSN",
                            "NCID"
                        ]
                    },
                    "subitem_1522646572813": {
                        "type": "string",
                        "title": "収録物識別子",
                        "format": "text",
                        "title_i18n": {
                            "en": "Source Identifier",
                            "ja": "収録物識別子"
                        },
                        "title_i18n_temp": {
                            "en": "Source Identifier",
                            "ja": "収録物識別子"
                        }
                    }
                }
            },
            "title": "Source Identifier",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617186941041": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_1522650068558": {
                        "enum": [
                            null,
                            "ja",
                            "ja-Latn",
                            "en",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "言語",
                        "format": "select",
                        "currentEnum": [
                            "ja",
                            "en",
                            "ja-Latn",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ]
                    },
                    "subitem_1522650091861": {
                        "type": "string",
                        "title": "収録物名",
                        "format": "text",
                        "title_i18n": {
                            "en": "Source Title",
                            "ja": "収録物名"
                        },
                        "title_i18n_temp": {
                            "en": "Source Title",
                            "ja": "収録物名"
                        }
                    }
                }
            },
            "title": "Source Title",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617186959569": {
            "type": "object",
            "title": "Volume Number",
            "properties": {
                "subitem_1551256328147": {
                    "type": "string",
                    "title": "Volume Number",
                    "format": "text",
                    "title_i18n": {
                        "en": "Volume Number",
                        "ja": "巻"
                    },
                    "title_i18n_temp": {
                        "en": "Volume Number",
                        "ja": "巻"
                    }
                }
            }
        },
        "item_1617186981471": {
            "type": "object",
            "title": "Issue Number",
            "properties": {
                "subitem_1551256294723": {
                    "type": "string",
                    "title": "Issue Number",
                    "format": "text",
                    "title_i18n": {
                        "en": "Issue Number",
                        "ja": "号"
                    },
                    "title_i18n_temp": {
                        "en": "Issue Number",
                        "ja": "号"
                    }
                }
            }
        },
        "item_1617186994930": {
            "type": "object",
            "title": "Number of Pages",
            "properties": {
                "subitem_1551256248092": {
                    "type": "string",
                    "title": "Number of Pages",
                    "format": "text",
                    "title_i18n": {
                        "en": "Number of Pages",
                        "ja": "ページ数"
                    },
                    "title_i18n_temp": {
                        "en": "Number of Pages",
                        "ja": "ページ数"
                    }
                }
            }
        },
        "item_1617187024783": {
            "type": "object",
            "title": "Page Start",
            "properties": {
                "subitem_1551256198917": {
                    "type": "string",
                    "title": "Page Start",
                    "format": "text",
                    "title_i18n": {
                        "en": "Page Start",
                        "ja": "開始ページ"
                    },
                    "title_i18n_temp": {
                        "en": "Page Start",
                        "ja": "開始ページ"
                    }
                }
            }
        },
        "item_1617187045071": {
            "type": "object",
            "title": "Page End",
            "properties": {
                "subitem_1551256185532": {
                    "type": "string",
                    "title": "Page End",
                    "format": "text",
                    "title_i18n": {
                        "en": "Page End",
                        "ja": "終了ページ"
                    },
                    "title_i18n_temp": {
                        "en": "Page End",
                        "ja": "終了ページ"
                    }
                }
            }
        },
        "item_1617187056579": {
            "type": "object",
            "title": "Bibliographic Information",
            "properties": {
                "bibliographicPageEnd": {
                    "type": "string",
                    "title": "終了ページ",
                    "format": "text",
                    "title_i18n": {
                        "en": "Page End",
                        "ja": "終了ページ"
                    },
                    "title_i18n_temp": {
                        "en": "Page End",
                        "ja": "終了ページ"
                    }
                },
                "bibliographic_titles": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "format": "object",
                        "properties": {
                            "bibliographic_title": {
                                "type": "string",
                                "title": "タイトル",
                                "format": "text",
                                "title_i18n": {
                                    "en": "Title",
                                    "ja": "タイトル"
                                },
                                "title_i18n_temp": {
                                    "en": "Title",
                                    "ja": "タイトル"
                                }
                            },
                            "bibliographic_titleLang": {
                                "enum": [
                                    null,
                                    "ja",
                                    "ja-Latn",
                                    "en",
                                    "fr",
                                    "it",
                                    "de",
                                    "es",
                                    "zh-cn",
                                    "zh-tw",
                                    "ru",
                                    "la",
                                    "ms",
                                    "eo",
                                    "ar",
                                    "el",
                                    "ko"
                                ],
                                "type": [
                                    "null",
                                    "string"
                                ],
                                "title": "言語",
                                "format": "select",
                                "currentEnum": [
                                    "ja",
                                    "en",
                                    "ja-Latn",
                                    "fr",
                                    "it",
                                    "de",
                                    "es",
                                    "zh-cn",
                                    "zh-tw",
                                    "ru",
                                    "la",
                                    "ms",
                                    "eo",
                                    "ar",
                                    "el",
                                    "ko"
                                ]
                            }
                        }
                    },
                    "title": "雑誌名",
                    "format": "array"
                },
                "bibliographicPageStart": {
                    "type": "string",
                    "title": "開始ページ",
                    "format": "text",
                    "title_i18n": {
                        "en": "Page Start",
                        "ja": "開始ページ"
                    },
                    "title_i18n_temp": {
                        "en": "Page Start",
                        "ja": "開始ページ"
                    }
                },
                "bibliographicIssueDates": {
                    "type": "object",
                    "title": "発行日",
                    "format": "object",
                    "properties": {
                        "bibliographicIssueDate": {
                            "type": "string",
                            "title": "日付",
                            "format": "datetime",
                            "title_i18n": {
                                "en": "Date",
                                "ja": "日付"
                            },
                            "title_i18n_temp": {
                                "en": "Date",
                                "ja": "日付"
                            }
                        },
                        "bibliographicIssueDateType": {
                            "enum": [
                                null,
                                "Issued"
                            ],
                            "type": [
                                "null",
                                "string"
                            ],
                            "title": "日付タイプ",
                            "format": "select",
                            "currentEnum": [
                                "Issued"
                            ]
                        }
                    }
                },
                "bibliographicIssueNumber": {
                    "type": "string",
                    "title": "号",
                    "format": "text",
                    "title_i18n": {
                        "en": "Issue Number",
                        "ja": "号"
                    },
                    "title_i18n_temp": {
                        "en": "Issue Number",
                        "ja": "号"
                    }
                },
                "bibliographicVolumeNumber": {
                    "type": "string",
                    "title": "巻",
                    "format": "text",
                    "title_i18n": {
                        "en": "Volume Number",
                        "ja": "巻"
                    },
                    "title_i18n_temp": {
                        "en": "Volume Number",
                        "ja": "巻"
                    }
                },
                "bibliographicNumberOfPages": {
                    "type": "string",
                    "title": "ページ数",
                    "format": "text",
                    "title_i18n": {
                        "en": "Number of Page",
                        "ja": "ページ数"
                    },
                    "title_i18n_temp": {
                        "en": "Number of Page",
                        "ja": "ページ数"
                    }
                }
            }
        },
        "item_1617187087799": {
            "type": "object",
            "title": "Dissertation Number",
            "properties": {
                "subitem_1551256171004": {
                    "type": "string",
                    "title": "Dissertation Number",
                    "format": "text",
                    "title_i18n": {
                        "en": "Dissertation Number",
                        "ja": "学位授与番号"
                    },
                    "title_i18n_temp": {
                        "en": "Dissertation Number",
                        "ja": "学位授与番号"
                    }
                }
            }
        },
        "item_1617187112279": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_1551256126428": {
                        "type": "string",
                        "title": "Degree Name",
                        "format": "text",
                        "title_i18n": {
                            "en": "Degree Name",
                            "ja": "学位名"
                        },
                        "title_i18n_temp": {
                            "en": "Degree Name",
                            "ja": "学位名"
                        }
                    },
                    "subitem_1551256129013": {
                        "enum": [
                            null,
                            "ja",
                            "ja-Latn",
                            "en",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "Language",
                        "format": "select",
                        "currentEnum": [
                            "ja",
                            "en",
                            "ja-Latn",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ]
                    }
                }
            },
            "title": "Degree Name",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617187136212": {
            "type": "object",
            "title": "Date Granted",
            "properties": {
                "subitem_1551256096004": {
                    "type": "string",
                    "title": "Date Granted",
                    "format": "datetime",
                    "title_i18n": {
                        "en": "Date Granted",
                        "ja": "学位授与年月日"
                    },
                    "title_i18n_temp": {
                        "en": "Date Granted",
                        "ja": "学位授与年月日"
                    }
                }
            }
        },
        "item_1617187187528": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_1599711633003": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "subitem_1599711636923": {
                                    "type": "string",
                                    "title": "Conference Name",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Conference Name",
                                        "ja": "会議名"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Conference Name",
                                        "ja": "会議名"
                                    }
                                },
                                "subitem_1599711645590": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "Language",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                }
                            }
                        },
                        "title": "Conference Name",
                        "format": "array"
                    },
                    "subitem_1599711655652": {
                        "type": "string",
                        "title": "Conference Sequence",
                        "format": "text",
                        "title_i18n": {
                            "en": "Conference Sequence",
                            "ja": "回次"
                        },
                        "title_i18n_temp": {
                            "en": "Conference Sequence",
                            "ja": "回次"
                        }
                    },
                    "subitem_1599711660052": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "subitem_1599711680082": {
                                    "type": "string",
                                    "title": "Conference Sponsor",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Conference Sponsor",
                                        "ja": "主催機関"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Conference Sponsor",
                                        "ja": "主催機関"
                                    }
                                },
                                "subitem_1599711686511": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "Language",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                }
                            }
                        },
                        "title": "Conference Sponsor",
                        "format": "array"
                    },
                    "subitem_1599711699392": {
                        "type": "object",
                        "title": "Conference Date",
                        "format": "object",
                        "properties": {
                            "subitem_1599711704251": {
                                "type": "string",
                                "title": "Conference Date",
                                "format": "text",
                                "title_i18n": {
                                    "en": "Conference Date",
                                    "ja": "開催期間"
                                },
                                "title_i18n_temp": {
                                    "en": "Conference Date",
                                    "ja": "開催期間"
                                }
                            },
                            "subitem_1599711712451": {
                                "type": "string",
                                "title": "Start Day",
                                "format": "text",
                                "title_i18n": {
                                    "en": "Start Day",
                                    "ja": "開始日"
                                },
                                "title_i18n_temp": {
                                    "en": "Start Day",
                                    "ja": "開始日"
                                }
                            },
                            "subitem_1599711727603": {
                                "type": "string",
                                "title": "Start Month",
                                "format": "text",
                                "title_i18n": {
                                    "en": "Start Month",
                                    "ja": "開始月"
                                },
                                "title_i18n_temp": {
                                    "en": "Start Month",
                                    "ja": "開始月"
                                }
                            },
                            "subitem_1599711731891": {
                                "type": "string",
                                "title": "Start Year",
                                "format": "text",
                                "title_i18n": {
                                    "en": "Start Year",
                                    "ja": "開始年"
                                },
                                "title_i18n_temp": {
                                    "en": "Start Year",
                                    "ja": "開始年"
                                }
                            },
                            "subitem_1599711735410": {
                                "type": "string",
                                "title": "End Day",
                                "format": "text",
                                "title_i18n": {
                                    "en": "End Day",
                                    "ja": "終了日"
                                },
                                "title_i18n_temp": {
                                    "en": "End Day",
                                    "ja": "終了日"
                                }
                            },
                            "subitem_1599711739022": {
                                "type": "string",
                                "title": "End Month",
                                "format": "text",
                                "title_i18n": {
                                    "en": "End Month",
                                    "ja": "終了月"
                                },
                                "title_i18n_temp": {
                                    "en": "End Month",
                                    "ja": "終了月"
                                }
                            },
                            "subitem_1599711743722": {
                                "type": "string",
                                "title": "End Year",
                                "format": "text",
                                "title_i18n": {
                                    "en": "End Year",
                                    "ja": "終了年"
                                },
                                "title_i18n_temp": {
                                    "en": "End Year",
                                    "ja": "終了年"
                                }
                            },
                            "subitem_1599711745532": {
                                "enum": [
                                    null,
                                    "ja",
                                    "ja-Latn",
                                    "en",
                                    "fr",
                                    "it",
                                    "de",
                                    "es",
                                    "zh-cn",
                                    "zh-tw",
                                    "ru",
                                    "la",
                                    "ms",
                                    "eo",
                                    "ar",
                                    "el",
                                    "ko"
                                ],
                                "type": [
                                    "null",
                                    "string"
                                ],
                                "title": "Language",
                                "format": "select",
                                "currentEnum": [
                                    "ja",
                                    "en",
                                    "ja-Latn",
                                    "fr",
                                    "it",
                                    "de",
                                    "es",
                                    "zh-cn",
                                    "zh-tw",
                                    "ru",
                                    "la",
                                    "ms",
                                    "eo",
                                    "ar",
                                    "el",
                                    "ko"
                                ]
                            }
                        }
                    },
                    "subitem_1599711758470": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "subitem_1599711769260": {
                                    "type": "string",
                                    "title": "Conference Venue",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Conference Venue",
                                        "ja": "開催会場"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Conference Venue",
                                        "ja": "開催会場"
                                    }
                                },
                                "subitem_1599711775943": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "Language",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                }
                            }
                        },
                        "title": "Conference Venue",
                        "format": "array"
                    },
                    "subitem_1599711788485": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "subitem_1599711798761": {
                                    "type": "string",
                                    "title": "Conference Place",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Conference Place",
                                        "ja": "開催地"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Conference Place",
                                        "ja": "開催地"
                                    }
                                },
                                "subitem_1599711803382": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "Language",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                }
                            }
                        },
                        "title": "Conference Place",
                        "format": "array"
                    },
                    "subitem_1599711813532": {
                        "enum": [
                            null,
                            "JPN",
                            "ABW",
                            "AFG",
                            "AGO",
                            "AIA",
                            "ALA",
                            "ALB",
                            "AND",
                            "ARE",
                            "ARG",
                            "ARM",
                            "ASM",
                            "ATA",
                            "ATF",
                            "ATG",
                            "AUS",
                            "AUT",
                            "AZE",
                            "BDI",
                            "BEL",
                            "BEN",
                            "BES",
                            "BFA",
                            "BGD",
                            "BGR",
                            "BHR",
                            "BHS",
                            "BIH",
                            "BLM",
                            "BLR",
                            "BLZ",
                            "BMU",
                            "BOL",
                            "BRA",
                            "BRB",
                            "BRN",
                            "BTN",
                            "BVT",
                            "BWA",
                            "CAF",
                            "CAN",
                            "CCK",
                            "CHE",
                            "CHL",
                            "CHN",
                            "CIV",
                            "CMR",
                            "COD",
                            "COG",
                            "COK",
                            "COL",
                            "COM",
                            "CPV",
                            "CRI",
                            "CUB",
                            "CUW",
                            "CXR",
                            "CYM",
                            "CYP",
                            "CZE",
                            "DEU",
                            "DJI",
                            "DMA",
                            "DNK",
                            "DOM",
                            "DZA",
                            "ECU",
                            "EGY",
                            "ERI",
                            "ESH",
                            "ESP",
                            "EST",
                            "ETH",
                            "FIN",
                            "FJI",
                            "FLK",
                            "FRA",
                            "FRO",
                            "FSM",
                            "GAB",
                            "GBR",
                            "GEO",
                            "GGY",
                            "GHA",
                            "GIB",
                            "GIN",
                            "GLP",
                            "GMB",
                            "GNB",
                            "GNQ",
                            "GRC",
                            "GRD",
                            "GRL",
                            "GTM",
                            "GUF",
                            "GUM",
                            "GUY",
                            "HKG",
                            "HMD",
                            "HND",
                            "HRV",
                            "HTI",
                            "HUN",
                            "IDN",
                            "IMN",
                            "IND",
                            "IOT",
                            "IRL",
                            "IRN",
                            "IRQ",
                            "ISL",
                            "ISR",
                            "ITA",
                            "JAM",
                            "JEY",
                            "JOR",
                            "KAZ",
                            "KEN",
                            "KGZ",
                            "KHM",
                            "KIR",
                            "KNA",
                            "KOR",
                            "KWT",
                            "LAO",
                            "LBN",
                            "LBR",
                            "LBY",
                            "LCA",
                            "LIE",
                            "LKA",
                            "LSO",
                            "LTU",
                            "LUX",
                            "LVA",
                            "MAC",
                            "MAF",
                            "MAR",
                            "MCO",
                            "MDA",
                            "MDG",
                            "MDV",
                            "MEX",
                            "MHL",
                            "MKD",
                            "MLI",
                            "MLT",
                            "MMR",
                            "MNE",
                            "MNG",
                            "MNP",
                            "MOZ",
                            "MRT",
                            "MSR",
                            "MTQ",
                            "MUS",
                            "MWI",
                            "MYS",
                            "MYT",
                            "NAM",
                            "NCL",
                            "NER",
                            "NFK",
                            "NGA",
                            "NIC",
                            "NIU",
                            "NLD",
                            "NOR",
                            "NPL",
                            "NRU",
                            "NZL",
                            "OMN",
                            "PAK",
                            "PAN",
                            "PCN",
                            "PER",
                            "PHL",
                            "PLW",
                            "PNG",
                            "POL",
                            "PRI",
                            "PRK",
                            "PRT",
                            "PRY",
                            "PSE",
                            "PYF",
                            "QAT",
                            "REU",
                            "ROU",
                            "RUS",
                            "RWA",
                            "SAU",
                            "SDN",
                            "SEN",
                            "SGP",
                            "SGS",
                            "SHN",
                            "SJM",
                            "SLB",
                            "SLE",
                            "SLV",
                            "SMR",
                            "SOM",
                            "SPM",
                            "SRB",
                            "SSD",
                            "STP",
                            "SUR",
                            "SVK",
                            "SVN",
                            "SWE",
                            "SWZ",
                            "SXM",
                            "SYC",
                            "SYR",
                            "TCA",
                            "TCD",
                            "TGO",
                            "THA",
                            "TJK",
                            "TKL",
                            "TKM",
                            "TLS",
                            "TON",
                            "TTO",
                            "TUN",
                            "TUR",
                            "TUV",
                            "TWN",
                            "TZA",
                            "UGA",
                            "UKR",
                            "UMI",
                            "URY",
                            "USA",
                            "UZB",
                            "VAT",
                            "VCT",
                            "VEN",
                            "VGB",
                            "VIR",
                            "VNM",
                            "VUT",
                            "WLF",
                            "WSM",
                            "YEM",
                            "ZAF",
                            "ZMB",
                            "ZWE"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "Conference Country",
                        "format": "select",
                        "currentEnum": [
                            "JPN",
                            "ABW",
                            "AFG",
                            "AGO",
                            "AIA",
                            "ALA",
                            "ALB",
                            "AND",
                            "ARE",
                            "ARG",
                            "ARM",
                            "ASM",
                            "ATA",
                            "ATF",
                            "ATG",
                            "AUS",
                            "AUT",
                            "AZE",
                            "BDI",
                            "BEL",
                            "BEN",
                            "BES",
                            "BFA",
                            "BGD",
                            "BGR",
                            "BHR",
                            "BHS",
                            "BIH",
                            "BLM",
                            "BLR",
                            "BLZ",
                            "BMU",
                            "BOL",
                            "BRA",
                            "BRB",
                            "BRN",
                            "BTN",
                            "BVT",
                            "BWA",
                            "CAF",
                            "CAN",
                            "CCK",
                            "CHE",
                            "CHL",
                            "CHN",
                            "CIV",
                            "CMR",
                            "COD",
                            "COG",
                            "COK",
                            "COL",
                            "COM",
                            "CPV",
                            "CRI",
                            "CUB",
                            "CUW",
                            "CXR",
                            "CYM",
                            "CYP",
                            "CZE",
                            "DEU",
                            "DJI",
                            "DMA",
                            "DNK",
                            "DOM",
                            "DZA",
                            "ECU",
                            "EGY",
                            "ERI",
                            "ESH",
                            "ESP",
                            "EST",
                            "ETH",
                            "FIN",
                            "FJI",
                            "FLK",
                            "FRA",
                            "FRO",
                            "FSM",
                            "GAB",
                            "GBR",
                            "GEO",
                            "GGY",
                            "GHA",
                            "GIB",
                            "GIN",
                            "GLP",
                            "GMB",
                            "GNB",
                            "GNQ",
                            "GRC",
                            "GRD",
                            "GRL",
                            "GTM",
                            "GUF",
                            "GUM",
                            "GUY",
                            "HKG",
                            "HMD",
                            "HND",
                            "HRV",
                            "HTI",
                            "HUN",
                            "IDN",
                            "IMN",
                            "IND",
                            "IOT",
                            "IRL",
                            "IRN",
                            "IRQ",
                            "ISL",
                            "ISR",
                            "ITA",
                            "JAM",
                            "JEY",
                            "JOR",
                            "KAZ",
                            "KEN",
                            "KGZ",
                            "KHM",
                            "KIR",
                            "KNA",
                            "KOR",
                            "KWT",
                            "LAO",
                            "LBN",
                            "LBR",
                            "LBY",
                            "LCA",
                            "LIE",
                            "LKA",
                            "LSO",
                            "LTU",
                            "LUX",
                            "LVA",
                            "MAC",
                            "MAF",
                            "MAR",
                            "MCO",
                            "MDA",
                            "MDG",
                            "MDV",
                            "MEX",
                            "MHL",
                            "MKD",
                            "MLI",
                            "MLT",
                            "MMR",
                            "MNE",
                            "MNG",
                            "MNP",
                            "MOZ",
                            "MRT",
                            "MSR",
                            "MTQ",
                            "MUS",
                            "MWI",
                            "MYS",
                            "MYT",
                            "NAM",
                            "NCL",
                            "NER",
                            "NFK",
                            "NGA",
                            "NIC",
                            "NIU",
                            "NLD",
                            "NOR",
                            "NPL",
                            "NRU",
                            "NZL",
                            "OMN",
                            "PAK",
                            "PAN",
                            "PCN",
                            "PER",
                            "PHL",
                            "PLW",
                            "PNG",
                            "POL",
                            "PRI",
                            "PRK",
                            "PRT",
                            "PRY",
                            "PSE",
                            "PYF",
                            "QAT",
                            "REU",
                            "ROU",
                            "RUS",
                            "RWA",
                            "SAU",
                            "SDN",
                            "SEN",
                            "SGP",
                            "SGS",
                            "SHN",
                            "SJM",
                            "SLB",
                            "SLE",
                            "SLV",
                            "SMR",
                            "SOM",
                            "SPM",
                            "SRB",
                            "SSD",
                            "STP",
                            "SUR",
                            "SVK",
                            "SVN",
                            "SWE",
                            "SWZ",
                            "SXM",
                            "SYC",
                            "SYR",
                            "TCA",
                            "TCD",
                            "TGO",
                            "THA",
                            "TJK",
                            "TKL",
                            "TKM",
                            "TLS",
                            "TON",
                            "TTO",
                            "TUN",
                            "TUR",
                            "TUV",
                            "TWN",
                            "TZA",
                            "UGA",
                            "UKR",
                            "UMI",
                            "URY",
                            "USA",
                            "UZB",
                            "VAT",
                            "VCT",
                            "VEN",
                            "VGB",
                            "VIR",
                            "VNM",
                            "VUT",
                            "WLF",
                            "WSM",
                            "YEM",
                            "ZAF",
                            "ZMB",
                            "ZWE"
                        ]
                    }
                }
            },
            "title": "Conference",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617258105262": {
            "type": "object",
            "title": "Resource Type",
            "required": [
                "resourceuri",
                "resourcetype"
            ],
            "properties": {
                "resourceuri": {
                    "type": "string",
                    "title": "資源タイプ識別子",
                    "format": "text",
                    "title_i18n": {
                        "en": "Resource Type Identifier",
                        "ja": "資源タイプ識別子"
                    },
                    "title_i18n_temp": {
                        "en": "Resource Type Identifier",
                        "ja": "資源タイプ識別子"
                    }
                },
                "resourcetype": {
                    "enum": [
                        null,
                        "conference paper",
                        "data paper",
                        "departmental bulletin paper",
                        "editorial",
                        "journal article",
                        "newspaper",
                        "periodical",
                        "review article",
                        "software paper",
                        "article",
                        "book",
                        "book part",
                        "cartographic material",
                        "map",
                        "conference object",
                        "conference proceedings",
                        "conference poster",
                        "aggregated data",
                        "clinical trial data",
                        "compiled data",
                        "encoded data",
                        "experimental data",
                        "genomic data",
                        "geospatial data",
                        "laboratory notebook",
                        "measurement and test data",
                        "observational data",
                        "recorded data",
                        "simulation data",
                        "survey data",
                        "dataset",
                        "interview",
                        "image",
                        "still image",
                        "moving image",
                        "video",
                        "lecture",
                        "patent",
                        "internal report",
                        "report",
                        "research report",
                        "technical report",
                        "policy report",
                        "report part",
                        "working paper",
                        "data management plan",
                        "sound",
                        "thesis",
                        "bachelor thesis",
                        "master thesis",
                        "doctoral thesis",
                        "interactive resource",
                        "learning object",
                        "manuscript",
                        "musical notation",
                        "research proposal",
                        "software",
                        "technical documentation",
                        "workflow",
                        "other"
                    ],
                    "type": [
                        "null",
                        "string"
                    ],
                    "title": "資源タイプ",
                    "format": "select",
                    "currentEnum": [
                        "conference paper",
                        "data paper",
                        "departmental bulletin paper",
                        "editorial",
                        "journal article",
                        "newspaper",
                        "periodical",
                        "review article",
                        "software paper",
                        "article",
                        "book",
                        "book part",
                        "cartographic material",
                        "map",
                        "conference object",
                        "conference proceedings",
                        "conference poster",
                        "dataset",
                        "aggregated data",
                        "clinical trial data",
                        "compiled data",
                        "encoded data",
                        "experimental data",
                        "genomic data",
                        "geospatial data",
                        "laboratory notebook",
                        "measurement and test data",
                        "observational data",
                        "recorded data",
                        "simulation data",
                        "survey data",
                        "interview",
                        "image",
                        "still image",
                        "moving image",
                        "video",
                        "lecture",
                        "patent",
                        "internal report",
                        "report",
                        "research report",
                        "technical report",
                        "policy report",
                        "report part",
                        "working paper",
                        "data management plan",
                        "sound",
                        "thesis",
                        "bachelor thesis",
                        "master thesis",
                        "doctoral thesis",
                        "interactive resource",
                        "learning object",
                        "manuscript",
                        "musical notation",
                        "research proposal",
                        "software",
                        "technical documentation",
                        "workflow",
                        "other"
                    ]
                }
            }
        },
        "item_1617265215918": {
            "type": "object",
            "title": "Version Type",
            "properties": {
                "subitem_1522305645492": {
                    "enum": [
                        null,
                        "AO",
                        "SMUR",
                        "AM",
                        "P",
                        "VoR",
                        "CVoR",
                        "EVoR",
                        "NA"
                    ],
                    "type": [
                        "null",
                        "string"
                    ],
                    "title": "出版タイプ",
                    "format": "select",
                    "currentEnum": [
                        "AO",
                        "SMUR",
                        "AM",
                        "P",
                        "VoR",
                        "CVoR",
                        "EVoR",
                        "NA"
                    ]
                },
                "subitem_1600292170262": {
                    "type": "string",
                    "title": "出版タイプResource",
                    "format": "text",
                    "title_i18n": {
                        "en": "Version Type Resource",
                        "ja": "出版タイプResource"
                    },
                    "title_i18n_temp": {
                        "en": "Version Type Resource",
                        "ja": "出版タイプResource"
                    }
                }
            }
        },
        "item_1617349709064": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "givenNames": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "givenName": {
                                    "type": "string",
                                    "title": "名",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Given Name",
                                        "ja": "名"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Given Name",
                                        "ja": "名"
                                    }
                                },
                                "givenNameLang": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Kana",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "言語",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "ja-Kana",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                }
                            }
                        },
                        "title": "寄与者名",
                        "format": "array"
                    },
                    "familyNames": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "familyName": {
                                    "type": "string",
                                    "title": "姓",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Family Name",
                                        "ja": "姓"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Family Name",
                                        "ja": "姓"
                                    }
                                },
                                "familyNameLang": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Kana",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "言語",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "ja-Kana",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                }
                            }
                        },
                        "title": "寄与者姓",
                        "format": "array"
                    },
                    "contributorType": {
                        "enum": [
                            null,
                            "ContactPerson",
                            "DataCollector",
                            "DataCurator",
                            "DataManager",
                            "Distributor",
                            "Editor",
                            "HostingInstitution",
                            "Producer",
                            "ProjectLeader",
                            "ProjectManager",
                            "ProjectMember",
                            "RelatedPerson",
                            "Researcher",
                            "ResearchGroup",
                            "Sponsor",
                            "Supervisor",
                            "WorkPackageLeader",
                            "Other"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "寄与者タイプ",
                        "format": "select",
                        "currentEnum": [
                            "ContactPerson",
                            "DataCollector",
                            "DataCurator",
                            "DataManager",
                            "Distributor",
                            "Editor",
                            "HostingInstitution",
                            "Producer",
                            "ProjectLeader",
                            "ProjectManager",
                            "ProjectMember",
                            "RelatedPerson",
                            "Researcher",
                            "ResearchGroup",
                            "Sponsor",
                            "Supervisor",
                            "WorkPackageLeader",
                            "Other"
                        ]
                    },
                    "nameIdentifiers": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "nameIdentifier": {
                                    "type": "string",
                                    "title": "寄与者識別子",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Contributor Identifier",
                                        "ja": "寄与者識別子"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Contributor Identifier",
                                        "ja": "寄与者識別子"
                                    }
                                },
                                "nameIdentifierURI": {
                                    "type": "string",
                                    "title": "寄与者識別子URI",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Contributor Identifier URI",
                                        "ja": "寄与者識別子URI"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Contributor Identifier URI",
                                        "ja": "寄与者識別子URI"
                                    }
                                },
                                "nameIdentifierScheme": {
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "寄与者識別子Scheme",
                                    "format": "select",
                                    "currentEnum": []
                                }
                            }
                        },
                        "title": "寄与者識別子",
                        "format": "array"
                    },
                    "contributorMails": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "contributorMail": {
                                    "type": "string",
                                    "title": "メールアドレス",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Email Address",
                                        "ja": "メールアドレス"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Email Address",
                                        "ja": "メールアドレス"
                                    }
                                }
                            }
                        },
                        "title": "寄与者メールアドレス",
                        "format": "array"
                    },
                    "contributorNames": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "lang": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Kana",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "言語",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "ja-Kana",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                },
                                "contributorName": {
                                    "type": "string",
                                    "title": "姓名",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Name",
                                        "ja": "姓名"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Name",
                                        "ja": "姓名"
                                    }
                                }
                            }
                        },
                        "title": "寄与者姓名",
                        "format": "array"
                    },
                    "contributorAffiliations": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "contributorAffiliationNames": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "format": "object",
                                        "properties": {
                                            "contributorAffiliationName": {
                                                "type": "string",
                                                "title": "所属機関名",
                                                "format": "text",
                                                "title_i18n": {
                                                    "en": "Affiliation Name",
                                                    "ja": "所属機関名"
                                                },
                                                "title_i18n_temp": {
                                                    "en": "Affiliation Name",
                                                    "ja": "所属機関名"
                                                }
                                            },
                                            "contributorAffiliationNameLang": {
                                                "enum": [
                                                    null,
                                                    "ja",
                                                    "ja-Kana",
                                                    "ja-Latn",
                                                    "en",
                                                    "fr",
                                                    "it",
                                                    "de",
                                                    "es",
                                                    "zh-cn",
                                                    "zh-tw",
                                                    "ru",
                                                    "la",
                                                    "ms",
                                                    "eo",
                                                    "ar",
                                                    "el",
                                                    "ko"
                                                ],
                                                "type": [
                                                    "null",
                                                    "string"
                                                ],
                                                "title": "言語",
                                                "format": "select",
                                                "currentEnum": [
                                                    "ja",
                                                    "ja-Kana",
                                                    "en",
                                                    "ja-Latn",
                                                    "fr",
                                                    "it",
                                                    "de",
                                                    "es",
                                                    "zh-cn",
                                                    "zh-tw",
                                                    "ru",
                                                    "la",
                                                    "ms",
                                                    "eo",
                                                    "ar",
                                                    "el",
                                                    "ko"
                                                ]
                                            }
                                        }
                                    },
                                    "title": "所属機関識別子",
                                    "format": "array"
                                },
                                "contributorAffiliationNameIdentifiers": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "format": "object",
                                        "properties": {
                                            "contributorAffiliationURI": {
                                                "type": "string",
                                                "title": "所属機関識別子URI",
                                                "format": "text",
                                                "title_i18n": {
                                                    "en": "Affiliation Name Identifier URI",
                                                    "ja": "所属機関識別子URI"
                                                },
                                                "title_i18n_temp": {
                                                    "en": "Affiliation Name Identifier URI",
                                                    "ja": "所属機関識別子URI"
                                                }
                                            },
                                            "contributorAffiliationScheme": {
                                                "enum": [
                                                    null,
                                                    "kakenhi",
                                                    "ISNI",
                                                    "Ringgold",
                                                    "GRID"
                                                ],
                                                "type": [
                                                    "null",
                                                    "string"
                                                ],
                                                "title": "所属機関識別子スキーマ",
                                                "format": "select",
                                                "currentEnum": [
                                                    "kakenhi",
                                                    "ISNI",
                                                    "Ringgold",
                                                    "GRID"
                                                ]
                                            },
                                            "contributorAffiliationNameIdentifier": {
                                                "type": "string",
                                                "title": "所属機関識別子",
                                                "format": "text",
                                                "title_i18n": {
                                                    "en": "Affiliation Name Identifier",
                                                    "ja": "所属機関識別子"
                                                },
                                                "title_i18n_temp": {
                                                    "en": "Affiliation Name Identifier",
                                                    "ja": "所属機関識別子"
                                                }
                                            }
                                        }
                                    },
                                    "title": "所属機関識別子",
                                    "format": "array"
                                }
                            }
                        },
                        "title": "寄与者所属",
                        "format": "array"
                    },
                    "contributorAlternatives": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "contributorAlternative": {
                                    "type": "string",
                                    "title": "別名",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Alternative Name",
                                        "ja": "別名"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Alternative Name",
                                        "ja": "別名"
                                    }
                                },
                                "contributorAlternativeLang": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Kana",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "言語",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "ja-Kana",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                }
                            }
                        },
                        "title": "寄与者別名",
                        "format": "array"
                    }
                }
            },
            "title": "Contributor",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617349808926": {
            "type": "object",
            "title": "Version",
            "properties": {
                "subitem_1523263171732": {
                    "type": "string",
                    "title": "バージョン情報",
                    "format": "text",
                    "title_i18n": {
                        "en": "Version",
                        "ja": "バージョン情報"
                    },
                    "title_i18n_temp": {
                        "en": "Version",
                        "ja": "バージョン情報"
                    }
                }
            }
        },
        "item_1617351524846": {
            "type": "object",
            "title": "APC",
            "properties": {
                "subitem_1523260933860": {
                    "enum": [
                        null,
                        "Paid",
                        "Fully waived",
                        "Not required",
                        "Partially waived",
                        "Not charged",
                        "Unknown"
                    ],
                    "type": [
                        "null",
                        "string"
                    ],
                    "title": "APC",
                    "format": "select",
                    "currentEnum": [
                        "Paid",
                        "Fully waived",
                        "Not required",
                        "Partially waived",
                        "Not charged",
                        "Unknown"
                    ]
                }
            }
        },
        "item_1617353299429": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_1522306207484": {
                        "enum": [
                            null,
                            "isVersionOf",
                            "hasVersion",
                            "isPartOf",
                            "hasPart",
                            "isReferencedBy",
                            "references",
                            "isFormatOf",
                            "hasFormat",
                            "isReplacedBy",
                            "replaces",
                            "isRequiredBy",
                            "requires",
                            "isSupplementTo",
                            "isSupplementedBy",
                            "isIdenticalTo",
                            "isDerivedFrom",
                            "isSourceOf",
                            "isCitedBy",
                            "Cites"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "関連タイプ",
                        "format": "select",
                        "currentEnum": [
                            "isVersionOf",
                            "hasVersion",
                            "isPartOf",
                            "hasPart",
                            "isReferencedBy",
                            "references",
                            "isFormatOf",
                            "hasFormat",
                            "isReplacedBy",
                            "replaces",
                            "isRequiredBy",
                            "requires",
                            "isSupplementTo",
                            "isSupplementedBy",
                            "isIdenticalTo",
                            "isDerivedFrom",
                            "isSourceOf",
                            "isCitedBy",
                            "Cites"
                        ]
                    },
                    "subitem_1522306287251": {
                        "type": "object",
                        "title": "関連識別子",
                        "format": "object",
                        "properties": {
                            "subitem_1522306382014": {
                                "enum": [
                                    null,
                                    "ARK",
                                    "arXiv",
                                    "DOI",
                                    "HDL",
                                    "ICHUSHI",
                                    "ISBN",
                                    "J-GLOBAL",
                                    "Local",
                                    "PISSN",
                                    "EISSN",
                                    "ISSN【非推奨】",
                                    "NAID",
                                    "NCID",
                                    "PMID",
                                    "PURL",
                                    "SCOPUS",
                                    "URI",
                                    "WOS"
                                ],
                                "type": [
                                    "null",
                                    "string"
                                ],
                                "title": "識別子タイプ",
                                "format": "select",
                                "currentEnum": [
                                    "ARK",
                                    "arXiv",
                                    "DOI",
                                    "HDL",
                                    "ICHUSHI",
                                    "ISBN",
                                    "J-GLOBAL",
                                    "Local",
                                    "PISSN",
                                    "EISSN",
                                    "ISSN（非推奨）",
                                    "NAID",
                                    "NCID",
                                    "PMID",
                                    "PURL",
                                    "SCOPUS",
                                    "URI",
                                    "WOS"
                                ]
                            },
                            "subitem_1522306436033": {
                                "type": "string",
                                "title": "関連識別子",
                                "format": "text",
                                "title_i18n": {
                                    "en": "Relation Identifier",
                                    "ja": "関連識別子"
                                },
                                "title_i18n_temp": {
                                    "en": "Relation Identifier",
                                    "ja": "関連識別子"
                                }
                            }
                        }
                    },
                    "subitem_1523320863692": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "subitem_1523320867455": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "言語",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                },
                                "subitem_1523320909613": {
                                    "type": "string",
                                    "title": "関連名称",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Related Title",
                                        "ja": "関連名称"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Related Title",
                                        "ja": "関連名称"
                                    }
                                }
                            }
                        },
                        "title": "関連名称",
                        "format": "array"
                    }
                }
            },
            "title": "Relation",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617605131499": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "url": {
                        "type": "object",
                        "title": "本文URL",
                        "format": "object",
                        "properties": {
                            "url": {
                                "type": "string",
                                "title": "本文URL",
                                "format": "text",
                                "title_i18n": {
                                    "en": "Text URL",
                                    "ja": "本文URL"
                                },
                                "title_i18n_temp": {
                                    "en": "Text URL",
                                    "ja": "本文URL"
                                }
                            },
                            "label": {
                                "type": "string",
                                "title": "ラベル",
                                "format": "text",
                                "title_i18n": {
                                    "en": "Label",
                                    "ja": "ラベル"
                                },
                                "title_i18n_temp": {
                                    "en": "Label",
                                    "ja": "ラベル"
                                }
                            },
                            "objectType": {
                                "enum": [
                                    null,
                                    "abstract",
                                    "summary",
                                    "fulltext",
                                    "thumbnail",
                                    "other"
                                ],
                                "type": [
                                    "null",
                                    "string"
                                ],
                                "title": "オブジェクトタイプ",
                                "format": "select",
                                "currentEnum": [
                                    "abstract",
                                    "summary",
                                    "fulltext",
                                    "thumbnail",
                                    "other"
                                ]
                            }
                        }
                    },
                    "date": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "dateType": {
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "日付タイプ",
                                    "format": "select",
                                    "currentEnum": []
                                },
                                "dateValue": {
                                    "type": "string",
                                    "title": "日付",
                                    "format": "datetime",
                                    "title_i18n": {
                                        "en": "",
                                        "ja": ""
                                    }
                                }
                            }
                        },
                        "title": "オープンアクセスの日付",
                        "format": "array"
                    },
                    "format": {
                        "type": "string",
                        "title": "フォーマット",
                        "format": "text",
                        "title_i18n": {
                            "en": "Format",
                            "ja": "フォーマット"
                        },
                        "title_i18n_temp": {
                            "en": "Format",
                            "ja": "フォーマット"
                        }
                    },
                    "groups": {
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "グループ",
                        "format": "select",
                        "currentEnum": []
                    },
                    "version": {
                        "type": "string",
                        "title": "バージョン情報",
                        "format": "text",
                        "title_i18n": {
                            "en": "Version Information",
                            "ja": "バージョン情報"
                        },
                        "title_i18n_temp": {
                            "en": "Version Information",
                            "ja": "バージョン情報"
                        }
                    },
                    "fileDate": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "fileDateType": {
                                    "enum": [
                                        null,
                                        "Accepted",
                                        "Collected",
                                        "Copyrighted",
                                        "Created",
                                        "Issued",
                                        "Submitted",
                                        "Updated",
                                        "Valid"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "日付タイプ",
                                    "format": "select",
                                    "currentEnum": [
                                        "Accepted",
                                        "Collected",
                                        "Copyrighted",
                                        "Created",
                                        "Issued",
                                        "Submitted",
                                        "Updated",
                                        "Valid"
                                    ]
                                },
                                "fileDateValue": {
                                    "type": "string",
                                    "title": "日付",
                                    "format": "datetime",
                                    "title_i18n": {
                                        "en": "Date",
                                        "ja": "日付"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Date",
                                        "ja": "日付"
                                    }
                                }
                            }
                        },
                        "title": "日付",
                        "format": "array"
                    },
                    "filename": {
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "表示名",
                        "format": "text",
                        "title_i18n": {
                            "en": "FileName",
                            "ja": "表示名"
                        },
                        "title_i18n_temp": {
                            "en": "FileName",
                            "ja": "表示名"
                        }
                    },
                    "filesize": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "value": {
                                    "type": "string",
                                    "title": "サイズ",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Size",
                                        "ja": "サイズ"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Size",
                                        "ja": "サイズ"
                                    }
                                }
                            }
                        },
                        "title": "サイズ",
                        "format": "array"
                    },
                    "accessrole": {
                        "enum": [
                            "open_access",
                            "open_date",
                            "open_login",
                            "open_no"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "アクセス",
                        "format": "radios"
                    },
                    "displaytype": {
                        "enum": [
                            null,
                            "detail",
                            "simple",
                            "preview"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "表示形式",
                        "format": "select",
                        "currentEnum": [
                            "detail",
                            "simple",
                            "preview"
                        ]
                    },
                    "licensefree": {
                        "type": "string",
                        "title": "自由ライセンス",
                        "format": "textarea",
                        "title_i18n": {
                            "en": "自由ライセンス",
                            "ja": "自由ライセンス"
                        }
                    },
                    "licensetype": {
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "ライセンス",
                        "format": "select",
                        "currentEnum": []
                    }
                }
            },
            "title": "File",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617610673286": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "nameIdentifiers": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "nameIdentifier": {
                                    "type": "string",
                                    "title": "権利者識別子",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Right Holder Identifier",
                                        "ja": "権利者識別子"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Right Holder Identifier",
                                        "ja": "権利者識別子"
                                    }
                                },
                                "nameIdentifierURI": {
                                    "type": "string",
                                    "title": "権利者識別子URI",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Right Holder Identifier URI",
                                        "ja": "権利者識別子URI"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Right Holder Identifier URI",
                                        "ja": "権利者識別子URI"
                                    }
                                },
                                "nameIdentifierScheme": {
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "権利者識別子Scheme",
                                    "format": "select",
                                    "currentEnum": []
                                }
                            }
                        },
                        "title": "権利者識別子",
                        "format": "array"
                    },
                    "rightHolderNames": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "rightHolderName": {
                                    "type": "string",
                                    "title": "権利者名",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Right Holder Name",
                                        "ja": "権利者名"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Right Holder Name",
                                        "ja": "権利者名"
                                    }
                                },
                                "rightHolderLanguage": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Kana",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "言語",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "ja-Kana",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                }
                            }
                        },
                        "title": "権利者名",
                        "format": "array"
                    }
                }
            },
            "title": "Rights Holder",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617620223087": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_1565671149650": {
                        "enum": [
                            null,
                            "ja",
                            "ja-Kana",
                            "ja-Latn",
                            "en",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ],
                        "type": [
                            "null",
                            "string"
                        ],
                        "title": "Language",
                        "format": "select",
                        "currentEnum": [
                            "ja",
                            "ja-Kana",
                            "en",
                            "ja-Latn",
                            "fr",
                            "it",
                            "de",
                            "es",
                            "zh-cn",
                            "zh-tw",
                            "ru",
                            "la",
                            "ms",
                            "eo",
                            "ar",
                            "el",
                            "ko"
                        ]
                    },
                    "subitem_1565671169640": {
                        "type": "string",
                        "title": "Banner Headline",
                        "format": "text",
                        "title_i18n": {
                            "en": "Banner Headline",
                            "ja": "大見出し"
                        },
                        "title_i18n_temp": {
                            "en": "Banner Headline",
                            "ja": "大見出し"
                        }
                    },
                    "subitem_1565671178623": {
                        "type": "string",
                        "title": "Subheading",
                        "format": "text",
                        "title_i18n": {
                            "en": "Subheading",
                            "ja": "小見出し"
                        },
                        "title_i18n_temp": {
                            "en": "Subheading",
                            "ja": "小見出し"
                        }
                    }
                }
            },
            "title": "Heading",
            "maxItems": 9999,
            "minItems": 1
        },
        "item_1617944105607": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "subitem_1551256015892": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "subitem_1551256027296": {
                                    "type": "string",
                                    "title": "Degree Grantor Name Identifier",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Degree Grantor Name Identifier",
                                        "ja": "学位授与機関識別子"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Degree Grantor Name Identifier",
                                        "ja": "学位授与機関識別子"
                                    }
                                },
                                "subitem_1551256029891": {
                                    "enum": [
                                        null,
                                        "kakenhi"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "Degree Grantor Name Identifier Scheme",
                                    "format": "select",
                                    "currentEnum": [
                                        "kakenhi"
                                    ]
                                }
                            }
                        },
                        "title": "Degree Grantor Name Identifier",
                        "format": "array"
                    },
                    "subitem_1551256037922": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "format": "object",
                            "properties": {
                                "subitem_1551256042287": {
                                    "type": "string",
                                    "title": "Degree Grantor Name",
                                    "format": "text",
                                    "title_i18n": {
                                        "en": "Degree Grantor Name",
                                        "ja": "学位授与機関名"
                                    },
                                    "title_i18n_temp": {
                                        "en": "Degree Grantor Name",
                                        "ja": "学位授与機関名"
                                    }
                                },
                                "subitem_1551256047619": {
                                    "enum": [
                                        null,
                                        "ja",
                                        "ja-Latn",
                                        "en",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ],
                                    "type": [
                                        "null",
                                        "string"
                                    ],
                                    "title": "Language",
                                    "format": "select",
                                    "currentEnum": [
                                        "ja",
                                        "en",
                                        "ja-Latn",
                                        "fr",
                                        "it",
                                        "de",
                                        "es",
                                        "zh-cn",
                                        "zh-tw",
                                        "ru",
                                        "la",
                                        "ms",
                                        "eo",
                                        "ar",
                                        "el",
                                        "ko"
                                    ]
                                }
                            }
                        },
                        "title": "Degree Grantor Name",
                        "format": "array"
                    }
                }
            },
            "title": "Degree Grantor",
            "maxItems": 9999,
            "minItems": 1
        },
        "system_identifier_doi": {
            "type": "object",
            "title": "Persistent Identifier(DOI)",
            "format": "object",
            "properties": {
                "subitem_systemidt_identifier": {
                    "type": "string",
                    "title": "SYSTEMIDT Identifier",
                    "format": "text"
                },
                "subitem_systemidt_identifier_type": {
                    "enum": [
                        "DOI",
                        "HDL",
                        "URI"
                    ],
                    "type": "string",
                    "title": "SYSTEMIDT Identifier Type",
                    "format": "select"
                }
            },
            "system_prop": true
        },
        "system_identifier_hdl": {
            "type": "object",
            "title": "Persistent Identifier(HDL)",
            "format": "object",
            "properties": {
                "subitem_systemidt_identifier": {
                    "type": "string",
                    "title": "SYSTEMIDT Identifier",
                    "format": "text"
                },
                "subitem_systemidt_identifier_type": {
                    "enum": [
                        "DOI",
                        "HDL",
                        "URI"
                    ],
                    "type": "string",
                    "title": "SYSTEMIDT Identifier Type",
                    "format": "select"
                }
            },
            "system_prop": true
        },
        "system_identifier_uri": {
            "type": "object",
            "title": "Persistent Identifier(URI)",
            "format": "object",
            "properties": {
                "subitem_systemidt_identifier": {
                    "type": "string",
                    "title": "SYSTEMIDT Identifier",
                    "format": "text"
                },
                "subitem_systemidt_identifier_type": {
                    "enum": [
                        "DOI",
                        "HDL",
                        "URI"
                    ],
                    "type": "string",
                    "title": "SYSTEMIDT Identifier Type",
                    "format": "select"
                }
            },
            "system_prop": true
        }
    },
    "description": ""
}

const input_forms = [];
var count = 0;
forms.forEach(form => {
    if (!("system_prop" in schema.properties[form.key] && schema.properties[form.key].system_prop == true)) {
        input_forms.push(<Panelform form={form} order={count} />)
        count++;
    }
});
uploadpdf.render(
    <PDFform />
)
uploadfile.render(
    <FileUploadForm />
)
root.render(
    <div class="form">
        {input_forms}
    </div>
);
