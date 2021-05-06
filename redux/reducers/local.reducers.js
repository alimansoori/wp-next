import {productConstants} from "../actions/constants";

const initState = {
    lang: "fa",
    region: {
        "value": "IR",
        "label": "ایران",
        "states": [
            {
                "value": "8315",
                "label": "آذربایجان شرقی",
                "cities": [
                    {
                        "value": "8319",
                        "label": "آبش‌احمد"
                    },
                    {
                        "value": "8320",
                        "label": "آچاچی"
                    },
                    {
                        "value": "8321",
                        "label": "آذرشهر"
                    },
                    {
                        "value": "8322",
                        "label": "آقکند"
                    },
                    {
                        "value": "8316",
                        "label": "اسکو"
                    },
                    {
                        "value": "8317",
                        "label": "اهر"
                    },
                    {
                        "value": "8318",
                        "label": "ایلخچی"
                    },
                    {
                        "value": "8323",
                        "label": "باروق"
                    },
                    {
                        "value": "8324",
                        "label": "باسمنج"
                    },
                    {
                        "value": "8325",
                        "label": "بخشایش"
                    },
                    {
                        "value": "8326",
                        "label": "بستان‌آباد"
                    },
                    {
                        "value": "8327",
                        "label": "بناب"
                    },
                    {
                        "value": "8328",
                        "label": "تبریز"
                    },
                    {
                        "value": "8329",
                        "label": "تسوج"
                    },
                    {
                        "value": "8330",
                        "label": "تیکمه‌داش"
                    },
                    {
                        "value": "8331",
                        "label": "جلفا"
                    },
                    {
                        "value": "8332",
                        "label": "چاراویماق"
                    },
                    {
                        "value": "8333",
                        "label": "خامنه"
                    },
                    {
                        "value": "8334",
                        "label": "خراجو"
                    },
                    {
                        "value": "8335",
                        "label": "خسروشهر"
                    },
                    {
                        "value": "8336",
                        "label": "خواجه"
                    },
                    {
                        "value": "8337",
                        "label": "دوزدوزان"
                    },
                    {
                        "value": "8338",
                        "label": "ذوالبین"
                    },
                    {
                        "value": "8339",
                        "label": "زرنق"
                    },
                    {
                        "value": "8340",
                        "label": "زنوز"
                    },
                    {
                        "value": "8341",
                        "label": "سراب"
                    },
                    {
                        "value": "8342",
                        "label": "سردرود"
                    },
                    {
                        "value": "8343",
                        "label": "سهند"
                    },
                    {
                        "value": "8344",
                        "label": "سیس"
                    },
                    {
                        "value": "8345",
                        "label": "شبستر"
                    },
                    {
                        "value": "8346",
                        "label": "شربیان"
                    },
                    {
                        "value": "8347",
                        "label": "شرفخانه"
                    },
                    {
                        "value": "8348",
                        "label": "شندآباد"
                    },
                    {
                        "value": "8349",
                        "label": "صوفیان"
                    },
                    {
                        "value": "8350",
                        "label": "عجب‌شیر"
                    },
                    {
                        "value": "8351",
                        "label": "قره‌آغاج"
                    },
                    {
                        "value": "8352",
                        "label": "کُشکسرای"
                    },
                    {
                        "value": "8353",
                        "label": "کلیبر"
                    },
                    {
                        "value": "8354",
                        "label": "کوزه‌کنان"
                    },
                    {
                        "value": "8355",
                        "label": "گوگان"
                    },
                    {
                        "value": "8356",
                        "label": "لیلان"
                    },
                    {
                        "value": "8357",
                        "label": "مراغه"
                    },
                    {
                        "value": "8358",
                        "label": "مرند"
                    },
                    {
                        "value": "8359",
                        "label": "ملکان"
                    },
                    {
                        "value": "8360",
                        "label": "ممقان"
                    },
                    {
                        "value": "8361",
                        "label": "مهربان"
                    },
                    {
                        "value": "8362",
                        "label": "میانه"
                    },
                    {
                        "value": "8365",
                        "label": "هادیشهر"
                    },
                    {
                        "value": "8366",
                        "label": "هریس"
                    },
                    {
                        "value": "8367",
                        "label": "هشترود"
                    },
                    {
                        "value": "8368",
                        "label": "هوراند"
                    },
                    {
                        "value": "8363",
                        "label": "وایقان"
                    },
                    {
                        "value": "8364",
                        "label": "ورزقان"
                    },
                    {
                        "value": "8369",
                        "label": "یامچی"
                    }
                ]
            },
            {
                "value": "8704",
                "label": "چهار محال بختیاری",
                "cities": [
                    {
                        "value": "8706",
                        "label": "آلونی"
                    },
                    {
                        "value": "8705",
                        "label": "اردل"
                    },
                    {
                        "value": "8707",
                        "label": "بروجن"
                    },
                    {
                        "value": "8708",
                        "label": "بلداجی"
                    },
                    {
                        "value": "8709",
                        "label": "جونقان"
                    },
                    {
                        "value": "8710",
                        "label": "چلگرد"
                    },
                    {
                        "value": "8711",
                        "label": "سامان"
                    },
                    {
                        "value": "8712",
                        "label": "سفیددشت"
                    },
                    {
                        "value": "8713",
                        "label": "سودجان"
                    },
                    {
                        "value": "8714",
                        "label": "سورشجان"
                    },
                    {
                        "value": "8715",
                        "label": "شلمزار"
                    },
                    {
                        "value": "8716",
                        "label": "شهرکرد"
                    },
                    {
                        "value": "8717",
                        "label": "فارسان"
                    },
                    {
                        "value": "8718",
                        "label": "فرادنبه"
                    },
                    {
                        "value": "8719",
                        "label": "فرخ‌شهر"
                    },
                    {
                        "value": "8720",
                        "label": "گندمان"
                    },
                    {
                        "value": "8721",
                        "label": "گهرو"
                    },
                    {
                        "value": "8722",
                        "label": "لردگان"
                    },
                    {
                        "value": "8723",
                        "label": "ناغان"
                    },
                    {
                        "value": "8724",
                        "label": "نافچ"
                    },
                    {
                        "value": "8725",
                        "label": "هفشجان"
                    }
                ]
            },
            {
                "value": "8282",
                "label": "آذربایجان غربی",
                "cities": [
                    {
                        "value": "8286",
                        "label": "آواجیق"
                    },
                    {
                        "value": "8283",
                        "label": "ارومیه"
                    },
                    {
                        "value": "8284",
                        "label": "اشنویه"
                    },
                    {
                        "value": "8285",
                        "label": "ایواوغلی"
                    },
                    {
                        "value": "8287",
                        "label": "باروق"
                    },
                    {
                        "value": "8288",
                        "label": "بازرگان"
                    },
                    {
                        "value": "8289",
                        "label": "بوکان"
                    },
                    {
                        "value": "8290",
                        "label": "پلدشت"
                    },
                    {
                        "value": "8291",
                        "label": "تکاب"
                    },
                    {
                        "value": "8292",
                        "label": "چایپاره"
                    },
                    {
                        "value": "8293",
                        "label": "خوی"
                    },
                    {
                        "value": "8294",
                        "label": "سردشت"
                    },
                    {
                        "value": "8295",
                        "label": "سرو"
                    },
                    {
                        "value": "8296",
                        "label": "سلماس"
                    },
                    {
                        "value": "8297",
                        "label": "سیلوانه"
                    },
                    {
                        "value": "8298",
                        "label": "سیمینه"
                    },
                    {
                        "value": "8299",
                        "label": "سیه‌چشمه"
                    },
                    {
                        "value": "8300",
                        "label": "شاهین‌دژ"
                    },
                    {
                        "value": "8301",
                        "label": "شوط"
                    },
                    {
                        "value": "8302",
                        "label": "فیرورق"
                    },
                    {
                        "value": "8303",
                        "label": "قره ضیاءالدین"
                    },
                    {
                        "value": "8304",
                        "label": "کشاورز"
                    },
                    {
                        "value": "8305",
                        "label": "گردکشانه"
                    },
                    {
                        "value": "8306",
                        "label": "ماکو"
                    },
                    {
                        "value": "8307",
                        "label": "محمدیار"
                    },
                    {
                        "value": "8308",
                        "label": "محمودآباد"
                    },
                    {
                        "value": "8309",
                        "label": "مهاباد"
                    },
                    {
                        "value": "8310",
                        "label": "میاندوآب"
                    },
                    {
                        "value": "8311",
                        "label": "میرآباد"
                    },
                    {
                        "value": "8312",
                        "label": "نالوس"
                    },
                    {
                        "value": "8313",
                        "label": "نقده"
                    },
                    {
                        "value": "8314",
                        "label": "نوشین‌شهر"
                    }
                ]
            },
            {
                "value": "8647",
                "label": "اردبيل",
                "cities": [
                    {
                        "value": "8650",
                        "label": "آبی‌بیگلو"
                    },
                    {
                        "value": "8648",
                        "label": "اردبیل"
                    },
                    {
                        "value": "8649",
                        "label": "اندبیل"
                    },
                    {
                        "value": "8651",
                        "label": "بیله‌سوار"
                    },
                    {
                        "value": "8652",
                        "label": "پارس‌آباد"
                    },
                    {
                        "value": "8653",
                        "label": "جعفرآباد"
                    },
                    {
                        "value": "8654",
                        "label": "جنگل فندقلو"
                    },
                    {
                        "value": "8655",
                        "label": "خلخال"
                    },
                    {
                        "value": "8656",
                        "label": "عنبران"
                    },
                    {
                        "value": "8657",
                        "label": "گرمی"
                    },
                    {
                        "value": "8658",
                        "label": "گیلوان"
                    },
                    {
                        "value": "8659",
                        "label": "گیوی"
                    },
                    {
                        "value": "8660",
                        "label": "مشگین‌شهر"
                    },
                    {
                        "value": "8661",
                        "label": "نمین"
                    },
                    {
                        "value": "8662",
                        "label": "نیر"
                    },
                    {
                        "value": "8663",
                        "label": "هیر"
                    }
                ]
            },
            {
                "value": "8370",
                "label": "اصفهان",
                "cities": [
                    {
                        "value": "8376",
                        "label": "آبچوئیه"
                    },
                    {
                        "value": "8377",
                        "label": "آران و بیدگل"
                    },
                    {
                        "value": "8371",
                        "label": "ابریشم"
                    },
                    {
                        "value": "8372",
                        "label": "ابوزیدآباد"
                    },
                    {
                        "value": "8373",
                        "label": "اردستان"
                    },
                    {
                        "value": "8374",
                        "label": "اژیه"
                    },
                    {
                        "value": "8375",
                        "label": "اصفهان"
                    },
                    {
                        "value": "8378",
                        "label": "بادرود"
                    },
                    {
                        "value": "8379",
                        "label": "برف‌انبار"
                    },
                    {
                        "value": "8380",
                        "label": "بهارستان"
                    },
                    {
                        "value": "8381",
                        "label": "تودشک"
                    },
                    {
                        "value": "8382",
                        "label": "تیران"
                    },
                    {
                        "value": "8383",
                        "label": "جوشقان و کامو"
                    },
                    {
                        "value": "8384",
                        "label": "چمگردان"
                    },
                    {
                        "value": "8385",
                        "label": "خالدآباد"
                    },
                    {
                        "value": "8386",
                        "label": "خمینی‌شهر"
                    },
                    {
                        "value": "8387",
                        "label": "خوانسار"
                    },
                    {
                        "value": "8388",
                        "label": "خور"
                    },
                    {
                        "value": "8389",
                        "label": "خوراسگان"
                    },
                    {
                        "value": "8390",
                        "label": "خورزوق"
                    },
                    {
                        "value": "8391",
                        "label": "داران"
                    },
                    {
                        "value": "8392",
                        "label": "دهق"
                    },
                    {
                        "value": "8393",
                        "label": "دیزیچه"
                    },
                    {
                        "value": "8394",
                        "label": "زاغل"
                    },
                    {
                        "value": "8395",
                        "label": "زرین‌شهر"
                    },
                    {
                        "value": "8396",
                        "label": "زیباشهر"
                    },
                    {
                        "value": "8397",
                        "label": "شاهین‌شهر"
                    },
                    {
                        "value": "8398",
                        "label": "شهرضا"
                    },
                    {
                        "value": "8399",
                        "label": "طالخونچه"
                    },
                    {
                        "value": "8400",
                        "label": "فریدون‌شهر"
                    },
                    {
                        "value": "8401",
                        "label": "کاشان"
                    },
                    {
                        "value": "8402",
                        "label": "کمشجه"
                    },
                    {
                        "value": "8404",
                        "label": "کهریزسنگ"
                    },
                    {
                        "value": "8403",
                        "label": "کوهپایه"
                    },
                    {
                        "value": "8405",
                        "label": "گلپایگان"
                    },
                    {
                        "value": "8406",
                        "label": "گل‌دشت"
                    },
                    {
                        "value": "8407",
                        "label": "گل‌شهر"
                    },
                    {
                        "value": "8408",
                        "label": "گوگد"
                    },
                    {
                        "value": "8409",
                        "label": "مبارکه"
                    },
                    {
                        "value": "8410",
                        "label": "محمدآباد"
                    },
                    {
                        "value": "8411",
                        "label": "میمه"
                    },
                    {
                        "value": "8412",
                        "label": "نجف‌آباد"
                    },
                    {
                        "value": "8413",
                        "label": "نطنز"
                    },
                    {
                        "value": "8414",
                        "label": "نوش‌آباد"
                    },
                    {
                        "value": "8415",
                        "label": "نیاسر"
                    },
                    {
                        "value": "8416",
                        "label": "نیک‌آباد"
                    },
                    {
                        "value": "8417",
                        "label": "ورنامخواست"
                    }
                ]
            },
            {
                "value": "8418",
                "label": "البرز",
                "cities": [
                    {
                        "value": "8420",
                        "label": "آسارا"
                    },
                    {
                        "value": "8419",
                        "label": "اشتهارد"
                    },
                    {
                        "value": "8421",
                        "label": "چهارباغ"
                    },
                    {
                        "value": "8422",
                        "label": "ساوجبلاغ"
                    },
                    {
                        "value": "8423",
                        "label": "طالقان"
                    },
                    {
                        "value": "8424",
                        "label": "کرج"
                    },
                    {
                        "value": "8425",
                        "label": "کمالشهر"
                    },
                    {
                        "value": "8426",
                        "label": "کوهسار"
                    },
                    {
                        "value": "8427",
                        "label": "گرمدره"
                    },
                    {
                        "value": "8428",
                        "label": "ماهدشت"
                    },
                    {
                        "value": "8429",
                        "label": "محمدشهر"
                    },
                    {
                        "value": "8430",
                        "label": "مشکین‌دشت"
                    },
                    {
                        "value": "8431",
                        "label": "نظرآباد"
                    },
                    {
                        "value": "8432",
                        "label": "هشتگرد"
                    }
                ]
            },
            {
                "value": "8664",
                "label": "ايلام",
                "cities": [
                    {
                        "value": "8666",
                        "label": "آسمان‌آباد"
                    },
                    {
                        "value": "8665",
                        "label": "ایلام"
                    },
                    {
                        "value": "8667",
                        "label": "پهله"
                    },
                    {
                        "value": "8668",
                        "label": "دهلران"
                    },
                    {
                        "value": "8670",
                        "label": "مهران"
                    },
                    {
                        "value": "8669",
                        "label": "موسیان"
                    },
                    {
                        "value": "8671",
                        "label": "میمه"
                    }
                ]
            },
            {
                "value": "8672",
                "label": "بوشهر",
                "cities": [
                    {
                        "value": "8675",
                        "label": "آب‌پخش"
                    },
                    {
                        "value": "8676",
                        "label": "آبدان"
                    },
                    {
                        "value": "8673",
                        "label": "امام حسن"
                    },
                    {
                        "value": "8674",
                        "label": "اهرم"
                    },
                    {
                        "value": "8677",
                        "label": "برازجان"
                    },
                    {
                        "value": "8678",
                        "label": "بردخون"
                    },
                    {
                        "value": "8679",
                        "label": "بردستان"
                    },
                    {
                        "value": "8680",
                        "label": "بندر بوشهر"
                    },
                    {
                        "value": "8681",
                        "label": "بندر دیر"
                    },
                    {
                        "value": "8682",
                        "label": "بندر دیلم"
                    },
                    {
                        "value": "8683",
                        "label": "بندر ریگ"
                    },
                    {
                        "value": "8684",
                        "label": "بندر کنگان"
                    },
                    {
                        "value": "8685",
                        "label": "بندر گناوه"
                    },
                    {
                        "value": "8686",
                        "label": "بنک"
                    },
                    {
                        "value": "8687",
                        "label": "تنگ ارم"
                    },
                    {
                        "value": "8688",
                        "label": "جم"
                    },
                    {
                        "value": "8689",
                        "label": "چغادک"
                    },
                    {
                        "value": "8690",
                        "label": "خارک"
                    },
                    {
                        "value": "8691",
                        "label": "خورموج"
                    },
                    {
                        "value": "8692",
                        "label": "دالکی"
                    },
                    {
                        "value": "8693",
                        "label": "دلوار"
                    },
                    {
                        "value": "8694",
                        "label": "ریز"
                    },
                    {
                        "value": "8695",
                        "label": "سعدآباد"
                    },
                    {
                        "value": "8696",
                        "label": "شبانکاره"
                    },
                    {
                        "value": "8697",
                        "label": "شنبه"
                    },
                    {
                        "value": "8698",
                        "label": "طاهری"
                    },
                    {
                        "value": "8699",
                        "label": "عسلویه"
                    },
                    {
                        "value": "8700",
                        "label": "کاکی"
                    },
                    {
                        "value": "8701",
                        "label": "کلمه"
                    },
                    {
                        "value": "8702",
                        "label": "نخل تقی"
                    },
                    {
                        "value": "8703",
                        "label": "وحدتیه"
                    }
                ]
            },
            {
                "value": "8433",
                "label": "تهران",
                "cities": [
                    {
                        "value": "8437",
                        "label": "آبعلی"
                    },
                    {
                        "value": "8434",
                        "label": "ارجمند"
                    },
                    {
                        "value": "8435",
                        "label": "اسلام‌شهر"
                    },
                    {
                        "value": "8436",
                        "label": "اندیشه"
                    },
                    {
                        "value": "8438",
                        "label": "باغستان"
                    },
                    {
                        "value": "8439",
                        "label": "باقرشهر"
                    },
                    {
                        "value": "8440",
                        "label": "پاکدشت"
                    },
                    {
                        "value": "8441",
                        "label": "پردیس"
                    },
                    {
                        "value": "8442",
                        "label": "پیشوا"
                    },
                    {
                        "value": "8443",
                        "label": "تهران"
                    },
                    {
                        "value": "8444",
                        "label": "دربندسر"
                    },
                    {
                        "value": "8445",
                        "label": "دماوند"
                    },
                    {
                        "value": "8446",
                        "label": "رباط‌کریم"
                    },
                    {
                        "value": "8447",
                        "label": "رودهن"
                    },
                    {
                        "value": "8448",
                        "label": "ری"
                    },
                    {
                        "value": "8449",
                        "label": "زردبند"
                    },
                    {
                        "value": "8450",
                        "label": "شاهدشهر"
                    },
                    {
                        "value": "8451",
                        "label": "شریف‌آباد"
                    },
                    {
                        "value": "8452",
                        "label": "شمیرانات"
                    },
                    {
                        "value": "8453",
                        "label": "شهریار"
                    },
                    {
                        "value": "8454",
                        "label": "صالح‌آباد"
                    },
                    {
                        "value": "8455",
                        "label": "صباشهر"
                    },
                    {
                        "value": "8456",
                        "label": "فردوسیه"
                    },
                    {
                        "value": "8457",
                        "label": "فشم"
                    },
                    {
                        "value": "8458",
                        "label": "فیروزکوه"
                    },
                    {
                        "value": "8459",
                        "label": "قدس"
                    },
                    {
                        "value": "8460",
                        "label": "قرچک"
                    },
                    {
                        "value": "8461",
                        "label": "کیلان"
                    },
                    {
                        "value": "8462",
                        "label": "گلستان"
                    },
                    {
                        "value": "8463",
                        "label": "لواسان"
                    },
                    {
                        "value": "8464",
                        "label": "ملارد"
                    },
                    {
                        "value": "8465",
                        "label": "نسیم‌شهر"
                    },
                    {
                        "value": "8466",
                        "label": "نصیرشهر"
                    },
                    {
                        "value": "8467",
                        "label": "وحیدیه"
                    },
                    {
                        "value": "8468",
                        "label": "ورامین"
                    },
                ]
            },
            {
                "value": "8738",
                "label": "خراسان جنوبی",
                "cities": [
                    {
                        "value": "8741",
                        "label": "آیَسک"
                    },
                    {
                        "value": "8739",
                        "label": "اسفدن"
                    },
                    {
                        "value": "8740",
                        "label": "اسلامیه"
                    },
                    {
                        "value": "8742",
                        "label": "بشرویه"
                    },
                    {
                        "value": "8743",
                        "label": "بیرجند"
                    },
                    {
                        "value": "8744",
                        "label": "خضری دشت بیاض"
                    },
                    {
                        "value": "8745",
                        "label": "درمیان"
                    },
                    {
                        "value": "8746",
                        "label": "سرایان"
                    },
                    {
                        "value": "8747",
                        "label": "سربیشه"
                    },
                    {
                        "value": "8748",
                        "label": "شوسف"
                    },
                    {
                        "value": "8749",
                        "label": "طارق"
                    },
                    {
                        "value": "8750",
                        "label": "فردوس"
                    },
                    {
                        "value": "8751",
                        "label": "قائن"
                    },
                    {
                        "value": "8752",
                        "label": "قائنات"
                    },
                    {
                        "value": "8753",
                        "label": "نهبندان"
                    }
                ]
            },
            {
                "value": "8469",
                "label": "خراسان رضوی",
                "cities": [
                    {
                        "value": "8470",
                        "label": "انابد"
                    },
                    {
                        "value": "8471",
                        "label": "باجگیران"
                    },
                    {
                        "value": "8472",
                        "label": "باخرز"
                    },
                    {
                        "value": "8473",
                        "label": "بایگ"
                    },
                    {
                        "value": "8474",
                        "label": "بجستان"
                    },
                    {
                        "value": "8475",
                        "label": "بردسکن"
                    },
                    {
                        "value": "8476",
                        "label": "بیدخت"
                    },
                    {
                        "value": "8477",
                        "label": "تایباد"
                    },
                    {
                        "value": "8478",
                        "label": "تربت جام"
                    },
                    {
                        "value": "8479",
                        "label": "تربت حیدریه"
                    },
                    {
                        "value": "8480",
                        "label": "چاپشلو"
                    },
                    {
                        "value": "8481",
                        "label": "چکنه"
                    },
                    {
                        "value": "8482",
                        "label": "چناران"
                    },
                    {
                        "value": "8483",
                        "label": "خرو"
                    },
                    {
                        "value": "8484",
                        "label": "خلیل‌آباد"
                    },
                    {
                        "value": "8485",
                        "label": "داورزن"
                    },
                    {
                        "value": "8486",
                        "label": "دررود"
                    },
                    {
                        "value": "8487",
                        "label": "دولت‌آباد"
                    },
                    {
                        "value": "8488",
                        "label": "رودآب"
                    },
                    {
                        "value": "8489",
                        "label": "سبزوار"
                    },
                    {
                        "value": "8490",
                        "label": "سرخس"
                    },
                    {
                        "value": "8491",
                        "label": "سلامی"
                    },
                    {
                        "value": "8492",
                        "label": "شادمهر"
                    },
                    {
                        "value": "8493",
                        "label": "شاندیز"
                    },
                    {
                        "value": "8494",
                        "label": "طرقبه"
                    },
                    {
                        "value": "8495",
                        "label": "عشق آباد"
                    },
                    {
                        "value": "8496",
                        "label": "فرهادگرد"
                    },
                    {
                        "value": "8497",
                        "label": "فریمان"
                    },
                    {
                        "value": "8498",
                        "label": "فیروزه"
                    },
                    {
                        "value": "8499",
                        "label": "فیض‌آباد"
                    },
                    {
                        "value": "8500",
                        "label": "قاسم‌آباد"
                    },
                    {
                        "value": "8501",
                        "label": "قدمگاه"
                    },
                    {
                        "value": "8502",
                        "label": "قوچان"
                    },
                    {
                        "value": "8503",
                        "label": "کاخک"
                    },
                    {
                        "value": "8504",
                        "label": "کاریز"
                    },
                    {
                        "value": "8505",
                        "label": "کاشمر"
                    },
                    {
                        "value": "8506",
                        "label": "کلات"
                    },
                    {
                        "value": "8507",
                        "label": "گناباد"
                    },
                    {
                        "value": "8508",
                        "label": "مشهد مقدس"
                    },
                    {
                        "value": "8509",
                        "label": "نصرآباد"
                    },
                    {
                        "value": "8510",
                        "label": "نوخندان"
                    },
                    {
                        "value": "8511",
                        "label": "نیشابور"
                    },
                    {
                        "value": "8512",
                        "label": "نیل‌شهر"
                    },
                    {
                        "value": "8513",
                        "label": "همت آباد"
                    }
                ]
            },
            {
                "value": "8726",
                "label": "خراسان شمالی",
                "cities": [
                    {
                        "value": "8728",
                        "label": "آشخانه"
                    },
                    {
                        "value": "8727",
                        "label": "اسفراین"
                    },
                    {
                        "value": "8729",
                        "label": "بجنورد"
                    },
                    {
                        "value": "8730",
                        "label": "پیش‌قلعه"
                    },
                    {
                        "value": "8731",
                        "label": "حصار گرم‌خان"
                    },
                    {
                        "value": "8732",
                        "label": "درق"
                    },
                    {
                        "value": "8733",
                        "label": "راز"
                    },
                    {
                        "value": "8734",
                        "label": "سنخواست"
                    },
                    {
                        "value": "8735",
                        "label": "شیروان"
                    },
                    {
                        "value": "8736",
                        "label": "صفی‌آباد"
                    },
                    {
                        "value": "8737",
                        "label": "لوجلی"
                    }
                ]
            },
            {
                "value": "8514",
                "label": "خوزستان",
                "cities": [
                    {
                        "value": "8520",
                        "label": "آبادان"
                    },
                    {
                        "value": "8515",
                        "label": "اروندکنار"
                    },
                    {
                        "value": "8516",
                        "label": "امیدیه"
                    },
                    {
                        "value": "8517",
                        "label": "اندیمشک"
                    },
                    {
                        "value": "8518",
                        "label": "اهواز"
                    },
                    {
                        "value": "8519",
                        "label": "ایذه"
                    },
                    {
                        "value": "8521",
                        "label": "باغ‌ملک"
                    },
                    {
                        "value": "8522",
                        "label": "بندر امام خمینی ره"
                    },
                    {
                        "value": "8523",
                        "label": "بهبهان"
                    },
                    {
                        "value": "8524",
                        "label": "چمران"
                    },
                    {
                        "value": "8525",
                        "label": "حر ریاحی"
                    },
                    {
                        "value": "8526",
                        "label": "خرمشهر"
                    },
                    {
                        "value": "8527",
                        "label": "دزفول"
                    },
                    {
                        "value": "8528",
                        "label": "دشت آزادگان"
                    },
                    {
                        "value": "8529",
                        "label": "رامهرمز"
                    },
                    {
                        "value": "8530",
                        "label": "سوسنگرد"
                    },
                    {
                        "value": "8531",
                        "label": "شادگان"
                    },
                    {
                        "value": "8532",
                        "label": "شوش"
                    },
                    {
                        "value": "8533",
                        "label": "شوشتر"
                    },
                    {
                        "value": "8534",
                        "label": "صیدون"
                    },
                    {
                        "value": "8535",
                        "label": "گتوند"
                    },
                    {
                        "value": "8536",
                        "label": "لالی"
                    },
                    {
                        "value": "8537",
                        "label": "ماهشهر"
                    },
                    {
                        "value": "8538",
                        "label": "مسجد سلیمان"
                    },
                    {
                        "value": "8539",
                        "label": "میانرود"
                    },
                    {
                        "value": "8540",
                        "label": "مینوشهر"
                    },
                    {
                        "value": "8541",
                        "label": "هفتگل"
                    },
                    {
                        "value": "8542",
                        "label": "هندیجان"
                    }
                ]
            },
            {
                "value": "8638",
                "label": "زنجان",
                "cities": [
                    {
                        "value": "8640",
                        "label": "آب‌بر"
                    },
                    {
                        "value": "8639",
                        "label": "ارمغان‌خانه"
                    },
                    {
                        "value": "8641",
                        "label": "خرمدره"
                    },
                    {
                        "value": "8642",
                        "label": "زنجان"
                    },
                    {
                        "value": "8643",
                        "label": "سجاس"
                    },
                    {
                        "value": "8644",
                        "label": "سهرورد"
                    },
                    {
                        "value": "8645",
                        "label": "قیدار"
                    },
                    {
                        "value": "8646",
                        "label": "ماه‌نشان"
                    }
                ]
            },
            {
                "value": "8754",
                "label": "سمنان",
                "cities": [
                    {
                        "value": "8756",
                        "label": "آرادان"
                    },
                    {
                        "value": "8755",
                        "label": "ایوانکی"
                    },
                    {
                        "value": "8757",
                        "label": "بسطام"
                    },
                    {
                        "value": "8758",
                        "label": "دامغان"
                    },
                    {
                        "value": "8759",
                        "label": "درجزین"
                    },
                    {
                        "value": "8760",
                        "label": "سرخه"
                    },
                    {
                        "value": "8761",
                        "label": "سمنان"
                    },
                    {
                        "value": "8762",
                        "label": "شاهرود"
                    },
                    {
                        "value": "8763",
                        "label": "شهمیرزاد"
                    },
                    {
                        "value": "8764",
                        "label": "کلاته خیج"
                    },
                    {
                        "value": "8765",
                        "label": "گرمسار"
                    },
                    {
                        "value": "8766",
                        "label": "مجن"
                    },
                    {
                        "value": "8767",
                        "label": "مهدی‌شهر"
                    }
                ]
            },
            {
                "value": "8768",
                "label": "سیستان و بلوچستان",
                "cities": [
                    {
                        "value": "8769",
                        "label": "ادیمی"
                    },
                    {
                        "value": "8770",
                        "label": "اسپکه"
                    },
                    {
                        "value": "8771",
                        "label": "ایرانشهر"
                    },
                    {
                        "value": "8772",
                        "label": "بزمان"
                    },
                    {
                        "value": "8773",
                        "label": "بمپور"
                    },
                    {
                        "value": "8774",
                        "label": "بنت"
                    },
                    {
                        "value": "8775",
                        "label": "بنجار"
                    },
                    {
                        "value": "8776",
                        "label": "پیشین"
                    },
                    {
                        "value": "8777",
                        "label": "جالق"
                    },
                    {
                        "value": "8778",
                        "label": "چابهار"
                    },
                    {
                        "value": "8779",
                        "label": "خاش"
                    },
                    {
                        "value": "8780",
                        "label": "دوست‌محمد"
                    },
                    {
                        "value": "8781",
                        "label": "راسک"
                    },
                    {
                        "value": "8782",
                        "label": "زابل"
                    },
                    {
                        "value": "8783",
                        "label": "زابلی"
                    },
                    {
                        "value": "8784",
                        "label": "زاهدان"
                    },
                    {
                        "value": "8785",
                        "label": "زهک"
                    },
                    {
                        "value": "8786",
                        "label": "سراوان"
                    },
                    {
                        "value": "8787",
                        "label": "سرباز"
                    },
                    {
                        "value": "8788",
                        "label": "سوران"
                    },
                    {
                        "value": "8789",
                        "label": "فنوج"
                    },
                    {
                        "value": "8790",
                        "label": "قصرقند"
                    },
                    {
                        "value": "8791",
                        "label": "کنارک"
                    },
                    {
                        "value": "8792",
                        "label": "گلمورتی"
                    },
                    {
                        "value": "8793",
                        "label": "محمدآباد"
                    },
                    {
                        "value": "8794",
                        "label": "میرجاوه"
                    },
                    {
                        "value": "8795",
                        "label": "نصرت‌آباد"
                    },
                    {
                        "value": "8796",
                        "label": "نگور"
                    },
                    {
                        "value": "8797",
                        "label": "نوک‌آباد"
                    },
                    {
                        "value": "8798",
                        "label": "نیک‌شهر"
                    }
                ]
            },
            {
                "value": "8543",
                "label": "فارس",
                "cities": [
                    {
                        "value": "8552",
                        "label": "آباده"
                    },
                    {
                        "value": "8546",
                        "label": "اردکان"
                    },
                    {
                        "value": "8547",
                        "label": "ارسنجان"
                    },
                    {
                        "value": "8548",
                        "label": "استهبان"
                    },
                    {
                        "value": "8549",
                        "label": "اشکنان"
                    },
                    {
                        "value": "8550",
                        "label": "اقلید"
                    },
                    {
                        "value": "8544",
                        "label": "اَهِل"
                    },
                    {
                        "value": "8545",
                        "label": "اِوَز"
                    },
                    {
                        "value": "8551",
                        "label": "ایزدخواست"
                    },
                    {
                        "value": "8553",
                        "label": "باب انار"
                    },
                    {
                        "value": "8554",
                        "label": "بالاده"
                    },
                    {
                        "value": "8555",
                        "label": "بنارویه"
                    },
                    {
                        "value": "8556",
                        "label": "بهمن"
                    },
                    {
                        "value": "8557",
                        "label": "بیرم"
                    },
                    {
                        "value": "8558",
                        "label": "جنت‌شهر"
                    },
                    {
                        "value": "8559",
                        "label": "جهرم"
                    },
                    {
                        "value": "8560",
                        "label": "خاوران"
                    },
                    {
                        "value": "8561",
                        "label": "خرامه"
                    },
                    {
                        "value": "8562",
                        "label": "خشت"
                    },
                    {
                        "value": "8563",
                        "label": "خنج"
                    },
                    {
                        "value": "8564",
                        "label": "خور"
                    },
                    {
                        "value": "8565",
                        "label": "خومه‌زار"
                    },
                    {
                        "value": "8566",
                        "label": "رستم"
                    },
                    {
                        "value": "8567",
                        "label": "سلطان شهر"
                    },
                    {
                        "value": "8568",
                        "label": "سورمق"
                    },
                    {
                        "value": "8569",
                        "label": "سوریان"
                    },
                    {
                        "value": "8570",
                        "label": "ششده"
                    },
                    {
                        "value": "8571",
                        "label": "شهر خنج"
                    },
                    {
                        "value": "8572",
                        "label": "شیراز"
                    },
                    {
                        "value": "8573",
                        "label": "صغاد"
                    },
                    {
                        "value": "8574",
                        "label": "صفاشهر"
                    },
                    {
                        "value": "8575",
                        "label": "علامرودشت"
                    },
                    {
                        "value": "8576",
                        "label": "فسا"
                    },
                    {
                        "value": "8577",
                        "label": "فیروزآباد"
                    },
                    {
                        "value": "8578",
                        "label": "قائمیه"
                    },
                    {
                        "value": "8579",
                        "label": "قطب‌آباد"
                    },
                    {
                        "value": "8580",
                        "label": "قیر"
                    },
                    {
                        "value": "8582",
                        "label": "کازرون"
                    },
                    {
                        "value": "8583",
                        "label": "کامفیروز"
                    },
                    {
                        "value": "8584",
                        "label": "کنارتخته"
                    },
                    {
                        "value": "8581",
                        "label": "کَوار"
                    },
                    {
                        "value": "8585",
                        "label": "گراش"
                    },
                    {
                        "value": "8586",
                        "label": "گله‌دار"
                    },
                    {
                        "value": "8587",
                        "label": "لار"
                    },
                    {
                        "value": "8588",
                        "label": "لامرد"
                    },
                    {
                        "value": "8590",
                        "label": "مرکزی گراش"
                    },
                    {
                        "value": "8591",
                        "label": "مرودشت"
                    },
                    {
                        "value": "8589",
                        "label": "مُهر"
                    },
                    {
                        "value": "8592",
                        "label": "میمند"
                    },
                    {
                        "value": "8593",
                        "label": "نودان"
                    },
                    {
                        "value": "8594",
                        "label": "نورآباد"
                    },
                    {
                        "value": "8595",
                        "label": "نورآباد ممسنی"
                    },
                    {
                        "value": "8596",
                        "label": "نی‌ریز"
                    },
                    {
                        "value": "8597",
                        "label": "وراوی"
                    }
                ]
            },
            {
                "value": "8799",
                "label": "قزوين",
                "cities": [
                    {
                        "value": "8805",
                        "label": "آبگرم"
                    },
                    {
                        "value": "8806",
                        "label": "آبيك"
                    },
                    {
                        "value": "8807",
                        "label": "آوج"
                    },
                    {
                        "value": "8800",
                        "label": "ارداق"
                    },
                    {
                        "value": "8801",
                        "label": "اسفرورين"
                    },
                    {
                        "value": "8802",
                        "label": "اقباليه"
                    },
                    {
                        "value": "8803",
                        "label": "البرز"
                    },
                    {
                        "value": "8804",
                        "label": "الوند"
                    },
                    {
                        "value": "8808",
                        "label": "بوئين زهرا"
                    },
                    {
                        "value": "8809",
                        "label": "بيدستان"
                    },
                    {
                        "value": "8810",
                        "label": "تاكستان"
                    },
                    {
                        "value": "8811",
                        "label": "خاكعلي"
                    },
                    {
                        "value": "8812",
                        "label": "خرمدشت"
                    },
                    {
                        "value": "8813",
                        "label": "دانسفهان"
                    },
                    {
                        "value": "8814",
                        "label": "رازميان"
                    },
                    {
                        "value": "8815",
                        "label": "سگزآباد"
                    },
                    {
                        "value": "8816",
                        "label": "سيردان"
                    },
                    {
                        "value": "8817",
                        "label": "شال"
                    },
                    {
                        "value": "8818",
                        "label": "شريفيه"
                    },
                    {
                        "value": "8819",
                        "label": "ضياآباد"
                    },
                    {
                        "value": "8820",
                        "label": "قزوين"
                    },
                    {
                        "value": "8821",
                        "label": "كوهين"
                    },
                    {
                        "value": "8822",
                        "label": "محمديه"
                    },
                    {
                        "value": "8823",
                        "label": "محمودآباد نمونه"
                    },
                    {
                        "value": "8824",
                        "label": "معلم كلايه"
                    },
                    {
                        "value": "8825",
                        "label": "نرجه"
                    }
                ]
            },
            {
                "value": "8826",
                "label": "قم",
                "cities": [
                    {
                        "value": "8830",
                        "label": "جعفریه"
                    },
                    {
                        "value": "8827",
                        "label": "دستجرد"
                    },
                    {
                        "value": "8832",
                        "label": "سلفچگان"
                    },
                    {
                        "value": "8828",
                        "label": "قم"
                    },
                    {
                        "value": "8829",
                        "label": "قنوات"
                    },
                    {
                        "value": "8831",
                        "label": "کهک"
                    }
                ]
            },
            {
                "value": "8833",
                "label": "کردستان",
                "cities": [
                    {
                        "value": "8834",
                        "label": "بابارشانی"
                    },
                    {
                        "value": "8835",
                        "label": "بانه"
                    },
                    {
                        "value": "8836",
                        "label": "بیجار"
                    },
                    {
                        "value": "8837",
                        "label": "چناره"
                    },
                    {
                        "value": "8838",
                        "label": "دهگلان"
                    },
                    {
                        "value": "8839",
                        "label": "زرینه"
                    },
                    {
                        "value": "8840",
                        "label": "سریش‌آباد"
                    },
                    {
                        "value": "8841",
                        "label": "سقز"
                    },
                    {
                        "value": "8842",
                        "label": "سنندج"
                    },
                    {
                        "value": "8843",
                        "label": "شویشه"
                    },
                    {
                        "value": "8844",
                        "label": "صاحب"
                    },
                    {
                        "value": "8845",
                        "label": "قروه"
                    },
                    {
                        "value": "8846",
                        "label": "مریوان"
                    },
                ]
            },
            {
                "value": "8847",
                "label": "کرمان",
                "cities": [
                    {
                        "value": "8848",
                        "label": "اختیارآباد"
                    },
                    {
                        "value": "8849",
                        "label": "امین‌شهر"
                    },
                    {
                        "value": "8850",
                        "label": "اندوهجرد"
                    },
                    {
                        "value": "8851",
                        "label": "باغین"
                    },
                    {
                        "value": "8852",
                        "label": "بافت"
                    },
                    {
                        "value": "8853",
                        "label": "بردسیر"
                    },
                    {
                        "value": "8854",
                        "label": "بروات"
                    },
                    {
                        "value": "8855",
                        "label": "بزنجان"
                    },
                    {
                        "value": "8856",
                        "label": "بم"
                    },
                    {
                        "value": "8857",
                        "label": "بهرمان"
                    },
                    {
                        "value": "8858",
                        "label": "پاریز"
                    },
                    {
                        "value": "8859",
                        "label": "جبالبارز"
                    },
                    {
                        "value": "8860",
                        "label": "جوپار"
                    },
                    {
                        "value": "8861",
                        "label": "جیرفت"
                    },
                    {
                        "value": "8862",
                        "label": "چترود"
                    },
                    {
                        "value": "8863",
                        "label": "دهج"
                    },
                    {
                        "value": "8864",
                        "label": "رابر"
                    },
                    {
                        "value": "8865",
                        "label": "راور"
                    },
                    {
                        "value": "8866",
                        "label": "راین"
                    },
                    {
                        "value": "8867",
                        "label": "رفسنجان"
                    },
                    {
                        "value": "8868",
                        "label": "ریحان‌شهر"
                    },
                    {
                        "value": "8869",
                        "label": "زنگی‌آباد"
                    },
                    {
                        "value": "8870",
                        "label": "زیدآباد"
                    },
                    {
                        "value": "8871",
                        "label": "سیرجان"
                    },
                    {
                        "value": "8872",
                        "label": "شهداد"
                    },
                    {
                        "value": "8873",
                        "label": "صفائیه"
                    },
                    {
                        "value": "8874",
                        "label": "فهرج"
                    },
                    {
                        "value": "8875",
                        "label": "کاظم‌آباد"
                    },
                    {
                        "value": "8876",
                        "label": "کرمان"
                    },
                    {
                        "value": "8877",
                        "label": "کوهبنان"
                    },
                    {
                        "value": "8878",
                        "label": "گلزار"
                    },
                    {
                        "value": "8879",
                        "label": "محی‌آباد"
                    },
                    {
                        "value": "8880",
                        "label": "مردهک"
                    },
                    {
                        "value": "8881",
                        "label": "منوجان"
                    },
                    {
                        "value": "8882",
                        "label": "نرماشیر"
                    },
                    {
                        "value": "8883",
                        "label": "نظام‌شهر"
                    },
                    {
                        "value": "8884",
                        "label": "نودژ"
                    },
                    {
                        "value": "8885",
                        "label": "یزدان‌شهر"
                    }
                ]
            },
            {
                "value": "8886",
                "label": "کرمانشاه",
                "cities": [
                    {
                        "value": "8887",
                        "label": "ازگله"
                    },
                    {
                        "value": "8888",
                        "label": "اسلام‌آباد غرب"
                    },
                    {
                        "value": "8889",
                        "label": "باینگان"
                    },
                    {
                        "value": "8890",
                        "label": "بیستون"
                    },
                    {
                        "value": "8891",
                        "label": "پاوه"
                    },
                    {
                        "value": "8892",
                        "label": "جوانرود"
                    },
                    {
                        "value": "8893",
                        "label": "روانسر"
                    },
                    {
                        "value": "8894",
                        "label": "سرپل ذهاب"
                    },
                    {
                        "value": "8895",
                        "label": "سرمست"
                    },
                    {
                        "value": "8896",
                        "label": "سطر"
                    },
                    {
                        "value": "8897",
                        "label": "سنقر"
                    },
                    {
                        "value": "8898",
                        "label": "سومار"
                    },
                    {
                        "value": "8899",
                        "label": "صحنه"
                    },
                    {
                        "value": "8900",
                        "label": "قصر شیرین"
                    },
                    {
                        "value": "8901",
                        "label": "کرمانشاه"
                    },
                    {
                        "value": "8902",
                        "label": "کنگاور"
                    },
                    {
                        "value": "8903",
                        "label": "کوزران"
                    },
                    {
                        "value": "8904",
                        "label": "گهواره"
                    },
                    {
                        "value": "8905",
                        "label": "گیلانغرب"
                    },
                    {
                        "value": "8906",
                        "label": "میان‌راهان"
                    },
                    {
                        "value": "8907",
                        "label": "نوسود"
                    },
                    {
                        "value": "8908",
                        "label": "هرسین"
                    },
                    {
                        "value": "8909",
                        "label": "هلشی"
                    }
                ]
            },
            {
                "value": "8910",
                "label": "کهگیلویه و بویراحمد",
                "cities": [
                    {
                        "value": "8928",
                        "label": "آزادشهر"
                    },
                    {
                        "value": "8929",
                        "label": "آق قلا"
                    },
                    {
                        "value": "8926",
                        "label": "انبار آلوم"
                    },
                    {
                        "value": "8927",
                        "label": "اینچه‌بُرون"
                    },
                    {
                        "value": "8930",
                        "label": "بندر ترکمن"
                    },
                    {
                        "value": "8931",
                        "label": "بندر گز"
                    },
                    {
                        "value": "8932",
                        "label": "خان‌ببین"
                    },
                    {
                        "value": "8933",
                        "label": "دلند"
                    },
                    {
                        "value": "8934",
                        "label": "سرخنکلاته"
                    },
                    {
                        "value": "8935",
                        "label": "سیمین‌شهر"
                    },
                    {
                        "value": "8936",
                        "label": "علی‌آباد کتول"
                    },
                    {
                        "value": "8937",
                        "label": "کردکوی"
                    },
                    {
                        "value": "8938",
                        "label": "کلاله"
                    },
                    {
                        "value": "8939",
                        "label": "گالیکش"
                    },
                    {
                        "value": "8940",
                        "label": "گرگان"
                    },
                    {
                        "value": "8941",
                        "label": "گلستان"
                    },
                    {
                        "value": "8942",
                        "label": "گمیشان"
                    },
                    {
                        "value": "8943",
                        "label": "گنبدکاووس"
                    },
                    {
                        "value": "8944",
                        "label": "مینودشت"
                    },
                    {
                        "value": "8945",
                        "label": "نگین‌شهر"
                    },
                    {
                        "value": "8946",
                        "label": "نوکنده"
                    }
                ]
            },
            {
                "value": "8925",
                "label": "گلستان",
                "cities": [
                    {
                        "value": "9076",
                        "label": "اردکان"
                    },
                ]
            },
            {
                "value": "8947",
                "label": "گیلان",
                "cities": [
                    {
                        "value": "8952",
                        "label": "آستانه اشرفیه"
                    },
                    {
                        "value": "8948",
                        "label": "احمدسرگوراب"
                    },
                    {
                        "value": "8949",
                        "label": "اسالم"
                    },
                    {
                        "value": "8950",
                        "label": "اطاقور"
                    },
                    {
                        "value": "8951",
                        "label": "املش"
                    },
                    {
                        "value": "8953",
                        "label": "بازارجمعه"
                    },
                    {
                        "value": "8955",
                        "label": "بندر آستارا"
                    },
                    {
                        "value": "8954",
                        "label": "بندر انزلی"
                    },
                    {
                        "value": "8956",
                        "label": "تالش"
                    },
                    {
                        "value": "8957",
                        "label": "توتکابن"
                    },
                    {
                        "value": "8958",
                        "label": "جیرنده"
                    },
                    {
                        "value": "8959",
                        "label": "چابکسر"
                    },
                    {
                        "value": "8960",
                        "label": "چوبر"
                    },
                    {
                        "value": "8961",
                        "label": "خلیفه محله"
                    },
                    {
                        "value": "8962",
                        "label": "رشت"
                    },
                    {
                        "value": "8963",
                        "label": "رضوان‌شهر"
                    },
                    {
                        "value": "8964",
                        "label": "رودبار"
                    },
                    {
                        "value": "8965",
                        "label": "رودبار زیتون"
                    },
                    {
                        "value": "8966",
                        "label": "رودبنه"
                    },
                    {
                        "value": "8967",
                        "label": "شفت"
                    },
                    {
                        "value": "8968",
                        "label": "شلمان"
                    },
                    {
                        "value": "8969",
                        "label": "صومعه سرا"
                    },
                    {
                        "value": "8970",
                        "label": "فومن"
                    },
                    {
                        "value": "8971",
                        "label": "کوچصفهان"
                    },
                    {
                        "value": "8972",
                        "label": "لاهیجان"
                    },
                    {
                        "value": "8973",
                        "label": "لشت نشا"
                    },
                    {
                        "value": "8974",
                        "label": "لنگرود"
                    },
                    {
                        "value": "8975",
                        "label": "لوشان"
                    },
                    {
                        "value": "8976",
                        "label": "لوندویل"
                    },
                    {
                        "value": "8977",
                        "label": "لیسار"
                    },
                    {
                        "value": "8978",
                        "label": "مارلیک"
                    },
                    {
                        "value": "8979",
                        "label": "ماسال"
                    },
                    {
                        "value": "8980",
                        "label": "مرجغل"
                    },
                    {
                        "value": "8981",
                        "label": "منجیل"
                    },
                    {
                        "value": "8983",
                        "label": "هشتپر"
                    },
                    {
                        "value": "8982",
                        "label": "واجارگاه"
                    },
                ]
            },
            {
                "value": "8984",
                "label": "لرستان",
                "cities": [
                    {
                        "value": "8985",
                        "label": "ازنا"
                    },
                    {
                        "value": "8986",
                        "label": "الشتر"
                    },
                    {
                        "value": "8987",
                        "label": "الیگودرز"
                    },
                    {
                        "value": "8988",
                        "label": "بروجرد"
                    },
                    {
                        "value": "8989",
                        "label": "پل‌دختر"
                    },
                    {
                        "value": "8990",
                        "label": "چالانچولان"
                    },
                    {
                        "value": "8991",
                        "label": "خرم‌آباد"
                    },
                    {
                        "value": "8992",
                        "label": "درب گنبد"
                    },
                    {
                        "value": "8993",
                        "label": "دورود"
                    },
                    {
                        "value": "8994",
                        "label": "زاغه"
                    },
                    {
                        "value": "8995",
                        "label": "سراب‌دوره"
                    },
                    {
                        "value": "8996",
                        "label": "فرزیان"
                    },
                    {
                        "value": "8997",
                        "label": "فیروزآباد"
                    },
                    {
                        "value": "8998",
                        "label": "کونانی"
                    },
                    {
                        "value": "8999",
                        "label": "کوهدشت"
                    },
                    {
                        "value": "9000",
                        "label": "گراب"
                    },
                    {
                        "value": "9001",
                        "label": "معمولان"
                    },
                    {
                        "value": "9002",
                        "label": "نورآباد"
                    },
                    {
                        "value": "9003",
                        "label": "ویسیان"
                    }
                ]
            },
            {
                "value": "8598",
                "label": "مازندران",
                "cities": [
                    {
                        "value": "8601",
                        "label": "آلاشت"
                    },
                    {
                        "value": "8602",
                        "label": "آمل"
                    },
                    {
                        "value": "8599",
                        "label": "امیرشهر"
                    },
                    {
                        "value": "8600",
                        "label": "ایزدشهر"
                    },
                    {
                        "value": "8603",
                        "label": "بابل"
                    },
                    {
                        "value": "8604",
                        "label": "بابلسر"
                    },
                    {
                        "value": "8605",
                        "label": "بلده"
                    },
                    {
                        "value": "8606",
                        "label": "بهشهر"
                    },
                    {
                        "value": "8607",
                        "label": "پل سفید"
                    },
                    {
                        "value": "8608",
                        "label": "تنکابن"
                    },
                    {
                        "value": "8609",
                        "label": "جویبار"
                    },
                    {
                        "value": "8610",
                        "label": "چالوس"
                    },
                    {
                        "value": "8611",
                        "label": "چمستان"
                    },
                    {
                        "value": "8612",
                        "label": "خلیل‌شهر"
                    },
                    {
                        "value": "8613",
                        "label": "خوش‌رودپی"
                    },
                    {
                        "value": "8614",
                        "label": "دابودشت"
                    },
                    {
                        "value": "8615",
                        "label": "رامسر"
                    },
                    {
                        "value": "8616",
                        "label": "رستمکلا"
                    },
                    {
                        "value": "8617",
                        "label": "رویان"
                    },
                    {
                        "value": "8618",
                        "label": "زرگرمحله"
                    },
                    {
                        "value": "8619",
                        "label": "ساری"
                    },
                    {
                        "value": "8620",
                        "label": "شیرگاه"
                    },
                    {
                        "value": "8621",
                        "label": "فریدون‌کنار"
                    },
                    {
                        "value": "8622",
                        "label": "فریم"
                    },
                    {
                        "value": "8623",
                        "label": "قائم‌شهر"
                    },
                    {
                        "value": "8624",
                        "label": "کلارآباد"
                    },
                    {
                        "value": "8625",
                        "label": "کلاردشت"
                    },
                    {
                        "value": "8626",
                        "label": "کله‌بست"
                    },
                    {
                        "value": "8627",
                        "label": "کوهی‌خیل"
                    },
                    {
                        "value": "8628",
                        "label": "کیاسر"
                    },
                    {
                        "value": "8629",
                        "label": "گتاب"
                    },
                    {
                        "value": "8630",
                        "label": "گرجی‌محله"
                    },
                    {
                        "value": "8631",
                        "label": "گزنک"
                    },
                    {
                        "value": "8632",
                        "label": "گلوگاه"
                    },
                    {
                        "value": "8633",
                        "label": "محمودآباد"
                    },
                    {
                        "value": "8634",
                        "label": "مرزن‌آباد"
                    },
                    {
                        "value": "8635",
                        "label": "مرزیکلا"
                    },
                    {
                        "value": "8636",
                        "label": "نشتارود"
                    },
                    {
                        "value": "8637",
                        "label": "نوشهر"
                    }
                ]
            },
            {
                "value": "9004",
                "label": "مرکزی",
                "cities": [
                    {
                        "value": "9005",
                        "label": "اراک"
                    },
                    {
                        "value": "9006",
                        "label": "انجدان"
                    },
                    {
                        "value": "9007",
                        "label": "آشتیان"
                    },
                    {
                        "value": "9008",
                        "label": "پرندک"
                    },
                    {
                        "value": "9009",
                        "label": "تفرش"
                    },
                    {
                        "value": "9010",
                        "label": "توره"
                    },
                    {
                        "value": "9011",
                        "label": "خمین"
                    },
                    {
                        "value": "9012",
                        "label": "خنداب"
                    },
                    {
                        "value": "9013",
                        "label": "رازقان"
                    },
                    {
                        "value": "9014",
                        "label": "زاویه"
                    },
                    {
                        "value": "9015",
                        "label": "ساوه"
                    },
                    {
                        "value": "9016",
                        "label": "سنجان"
                    },
                    {
                        "value": "9017",
                        "label": "شازند"
                    },
                    {
                        "value": "9018",
                        "label": "ضامنجان"
                    },
                    {
                        "value": "9019",
                        "label": "غرق‌آباد"
                    },
                    {
                        "value": "9020",
                        "label": "فرمهین"
                    },
                    {
                        "value": "9021",
                        "label": "فیجان"
                    },
                    {
                        "value": "9022",
                        "label": "قورچی‌باشی"
                    },
                    {
                        "value": "9023",
                        "label": "کرهرود"
                    },
                    {
                        "value": "9024",
                        "label": "کمیجان"
                    },
                    {
                        "value": "9025",
                        "label": "مأمونیه"
                    },
                    {
                        "value": "9026",
                        "label": "محلات"
                    },
                    {
                        "value": "9027",
                        "label": "نراق"
                    },
                    {
                        "value": "9028",
                        "label": "نوبران"
                    },
                    {
                        "value": "9029",
                        "label": "نیم‌ور"
                    },
                ]
            },
            {
                "value": "9030",
                "label": "هرمزگان",
                "cities": [
                    {
                        "value": "9031",
                        "label": "ابوموسی"
                    },
                    {
                        "value": "9032",
                        "label": "بستک"
                    },
                    {
                        "value": "9033",
                        "label": "بندر چارک"
                    },
                    {
                        "value": "9034",
                        "label": "بندر خمیر"
                    },
                    {
                        "value": "9035",
                        "label": "بندر عباس"
                    },
                    {
                        "value": "9036",
                        "label": "بندر لنگه"
                    },
                    {
                        "value": "9038",
                        "label": "پارسیان"
                    },
                    {
                        "value": "9039",
                        "label": "جاسک"
                    },
                    {
                        "value": "9040",
                        "label": "جزیره کیش"
                    },
                    {
                        "value": "9041",
                        "label": "جناح"
                    },
                    {
                        "value": "9042",
                        "label": "حاجی‌آباد"
                    },
                    {
                        "value": "9043",
                        "label": "درگهان"
                    },
                    {
                        "value": "9044",
                        "label": "رودان"
                    },
                    {
                        "value": "9045",
                        "label": "سندرک"
                    },
                    {
                        "value": "9046",
                        "label": "سیریک"
                    },
                    {
                        "value": "9047",
                        "label": "شهر رویدر"
                    },
                    {
                        "value": "9048",
                        "label": "شهر کنگ"
                    },
                    {
                        "value": "9050",
                        "label": "فین"
                    },
                    {
                        "value": "9051",
                        "label": "قشم"
                    },
                    {
                        "value": "9052",
                        "label": "لنگه"
                    },
                    {
                        "value": "9053",
                        "label": "میناب"
                    },
                ]
            },
            {
                "value": "9054",
                "label": "همدان",
                "cities": [
                    {
                        "value": "9055",
                        "label": "برزول"
                    },
                    {
                        "value": "9056",
                        "label": "بهار"
                    },
                    {
                        "value": "9057",
                        "label": "حسین آباد ناظم"
                    },
                    {
                        "value": "9058",
                        "label": "دانشگاه پیام نور لالجین"
                    },
                    {
                        "value": "9059",
                        "label": "رزن"
                    },
                    {
                        "value": "9060",
                        "label": "زنگنه"
                    },
                    {
                        "value": "9061",
                        "label": "سامن"
                    },
                    {
                        "value": "9062",
                        "label": "صالح‌آباد"
                    },
                    {
                        "value": "9063",
                        "label": "فامنین"
                    },
                    {
                        "value": "9064",
                        "label": "فرسفج"
                    },
                    {
                        "value": "9065",
                        "label": "فیروزان"
                    },
                    {
                        "value": "9066",
                        "label": "قهاوند"
                    },
                    {
                        "value": "9067",
                        "label": "کبود رآهنگ"
                    },
                    {
                        "value": "9068",
                        "label": "گیان"
                    },
                    {
                        "value": "9069",
                        "label": "لالجین"
                    },
                    {
                        "value": "9070",
                        "label": "ملایر"
                    },
                    {
                        "value": "9071",
                        "label": "مهاجران"
                    },
                    {
                        "value": "9072",
                        "label": "نهاوند"
                    },
                    {
                        "value": "9074",
                        "label": "همدان"
                    },
                    {
                        "value": "9073",
                        "label": "ویژه ملایر"
                    },
                ]
            },
            {
                "value": "9075",
                "label": "يزد",
                "cities": [
                    {
                        "value": "9076",
                        "label": "اردکان"
                    },
                    {
                        "value": "9077",
                        "label": "بافق"
                    },
                    {
                        "value": "9078",
                        "label": "دیهوک"
                    },
                    {
                        "value": "9079",
                        "label": "فردوس"
                    },
                    {
                        "value": "9080",
                        "label": "مروست"
                    },
                    {
                        "value": "9081",
                        "label": "مهردشت"
                    },
                    {
                        "value": "9082",
                        "label": "میبد"
                    },
                    {
                        "value": "9083",
                        "label": "ندوشن"
                    },
                    {
                        "value": "9084",
                        "label": "یزد"
                    },
                ]
            }
        ]
    },
    localPrice: true,
    loading: false,
    error: null,
}

export default (state = initState, action) => {

    /*switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_REQUEST:
            console.log(action);
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            console.log(action);
            state = {
                ...state,
                loading: false,
                products: action.payload.products
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_FAILURE:
            console.log(action);
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
    }*/

    return state;
}