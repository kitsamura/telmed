   $(document).ready(function () {


       $('.closeModal').click(function () {
           $('.modalDoctor').hide();
           $('.siteWrapper').css('filter', 'none');
       })


       $('.news_right').click(function() {
           console.log('right');
        $('.owl-item .active').animate({ right: '-=281', }, 5000, function() { });
       });

       $('.news_left').click(function() {
           console.log('left');
        $('.owl-item .active').animate({ left: '-=281', }, 5000, function() { });
       });


       $('.partners__mailSend').click(function(){
           $(this).attr('disabled','disabled');
           setTimeout(() => {
               $(this).removeAttr('disabled')
           },1000)
           let partmail = $('.partners__email').val();
           $.ajax({
               url: 'send.php',
               type: 'POST',
               data: {
                   msg: partmail
               },
               success: function(data){
                   $('.partners__mailSend').attr('disabled','disabled')
                   $('.partners__email').val('')
                   $('#open-block').toggleClass('active_a');
                   
               }
           })
       });
       $(document).on('keyup','.partners__email', function () {

        let email = $(this).val();
        
        if (email.length > 0
        && (email.match(/.+?\@.+/g) || []).length !== 1) {

          $(this).css("box-shadow","0 0 2px 0 red").addClass('invalid');
        } else {

          $(this).css("box-shadow","none").removeClass('invalid');
        }
    });
       $('.partners__email').keyup(function(){
           let mail = $(this).val()
           if((mail.length > 5) && !($('.partners__email').hasClass('invalid'))){
            $('.partners__mailSend').removeAttr('disabled').css('opacity','1')
           } else {
            $('.partners__mailSend').attr('disabled','disabled').css('opacity','0.5')
           }
       })
       $(document).on('keyup','.input__email', function () {

        let email = $(this).val();
        
        if (email.length > 0
        && (email.match(/.+?\@.+/g) || []).length !== 1) {

          $(this).css("box-shadow","0 0 2px 0 red").addClass('invalid');
        } else {

          $(this).css("box-shadow","none").removeClass('invalid');
        }
    });
           function updateURL() {
            if (history.pushState) {
                var baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                var newUrl = baseUrl + '#open-block';
                history.pushState(null, null, newUrl);
                $('.link-open-block').trigger('click')
            }
            else {
                console.warn('History API не поддерживается');
            }
        }

    //    updateURL()
        $('.send').click(function(){
            $(this).attr('disabled','disabled');
           setTimeout(() => {
               $(this).removeAttr('disabled')
           },1000)
            let name = $('#name').val();
            let lastname = $('#lastname').val();
            let email = $('#mail').val();
            let tel = $('#phone').val();
            let msg = $('#messagearea').val();
            let mailtheme = $('.select-selected')[2].textContent;
            
            $.ajax({
                url: 'sendform.php',
                type: 'POST',
                data: {
                    name: name,
                    lastname: lastname,
                    email: email,
                    tel: tel, 
                    msg: msg,
                    mailtheme: mailtheme
                },
                success: function (data){
                    $('#form input').val('');
                    $('#form textarea').val('')
                    $('#open-block').toggleClass('active_a');
                    $('.send').attr('disabled','disabled')
                }
            })
        })
       //69
       $('.closik').click(function(){
           $('#open-block').toggleClass('active_a');
       })
    //    $('.slider__item').click(function(){
    //     $('.modalDoctor').show();
    //     $('.siteWrapper').css('filter', 'blur(10px)');
    //     let target = $(this).attr('data-target');
    //     $('.owl-carousel-doctors').trigger('refresh.owl.carousel');
    //     $('.owl-carousel-doctors').trigger("to.owl.carousel", [$('.'+target).parent().parent().index(), 0, true])
    //     
    //     })
        $('.slider__item').click(function(){
            let doctorImg = $(this).css('background-image');
            doctorImg = doctorImg.replace(`url("`, '').replace(`")`,'')
            let doctorName = $(this).find('#doctor_name').text();
            let doctorPosition = $(this).find('#doctor_position').text();
            let doctorText = $(this).find('#doctor__text');
            doctorText = doctorText[0].innerHTML;
            $('.doctor__img').attr('src',`${doctorImg}`);
            $('.doctor__position').text(doctorPosition);
            $('.doctor__name').text(doctorName);
            document.getElementById('doctor__infoText').innerHTML = doctorText
            // $('.doctor__infoText').append(doctorText)
            $('#popup__doctor').fadeIn('900');
            $('.siteWrapper').css("filter","blur(10px)");
            $('body').css('overflow-y','hidden').css('padding-right','17px');
        });

        var keyy = 1;
        var intID = setInterval(function(){
            changeTab();
        },4000);
        
        // $('#lottie').ready(function(){
        //     intID
        //     console.log('старт')
        // });

        const animFunction = () => {
            return animation =  lottie.loadAnimation({
                container: document.getElementById('anim'),
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: 'js1/data.json'
            })
            }
            
            animFunction();

        function changeTab (){

            let maxstep = $('.howitwork__secondcolumn').children().length;
            let steps = $('.howitwork__secondcolumn').children(); 
            $('.step').removeClass('step_active');
            $(steps[keyy]).addClass('step_active');
            if (keyy == maxstep -1) {

                setTimeout(()=>{
                    lottie.pause()

                },6000)
                clearInterval(intID) 
               
            } else {
                keyy++;
            }

        }
        $('.popup__doctor').mouseup(function(e){
            
            let mypopup = $('.doctor__block');
            if (!mypopup.is(e.target) && mypopup.has(e.target).length === 0){
                $('#popup__doctor').fadeOut('900');
                $('.siteWrapper').css("filter","none");
                $('body').css('overflow-y','visible').css('padding-right','0');
            }            
        });

        $(this).keydown(function(eventObject){
            if ($('#popup__doctor').css('display')=='block') {
                if (eventObject.which == 27)
                    $('#popup__doctor').fadeOut('900');
                    $('.siteWrapper').css("filter","none");
                    $('body').css('overflow-y','visible').css('padding-right','0');
            }
        });

        $('.doctor__close').click(function(){
            $('#popup__doctor').fadeOut('900');
            $('.siteWrapper').css("filter","none");
            $('body').css('overflow-y','visible').css('padding-right','0');
        });

        $('.imgBurger').click(()=>{$('.mobileMenu').toggleClass('active')})

        $('.imgBurger').click(function(){
           
            $('.siteWrapper').hide();
        })

        $('.mobileItem').click(function(){
            // $('.mobileMenu').hide();
            // $('.siteWrapper').show();
        })

        $('.partnersBorder').click(function(){
            $('.partnersBorder').removeClass('partnersBorder_active')
            $(this).addClass('partnersBorder_active')
        });

         $('.mobileClose').click(function(){
             $('.mobileMenu').removeClass('active');
             $('.siteWrapper').show();
         })

       $('#banks').click(function () {
           $('.modalCoopiration').hide();
           $('#modalBanks').show();
       })

       $('#insurance').click(function () {
           $('.modalCoopiration').hide();
           $('#modalInsurance').show();
       })

       $('#mfo').click(function () {
           $('.modalCoopiration').hide();
           $('#modalMfo').show();
       })

       $('#retail').click(function () {
           $('.modalCoopiration').hide();
           $('#modalRetail').show();
       })

       $('#marketPlace').click(function () {
           $('.modalCoopiration').hide();
           $('#modalMarketPlace').show();
       })

       $('#clinics').click(function () {
           $('.modalCoopiration').hide();
           $('#modalClinics').show();
       })

       $('#airlines').click(function () {
           $('.modalCoopiration').hide();
           $('#modalAirlines').show();
       })

       $('#tourism').click(function () {
           $('.modalCoopiration').hide();
           $('#modalTourism').show();
       })

       $('#brokers').click(function () {
           $('.modalCoopiration').hide();
           $('#modalBrokers').show();
       })

       $('.slider').slider();

       var x, i, j, selElmnt, a, b, c;
       /*look for any elements with the class "custom-select":*/
       x = document.getElementsByClassName("custom-select");
       for (i = 0; i < x.length; i++) {
           selElmnt = x[i].getElementsByTagName("select")[0];
           /*for each element, create a new DIV that will act as the selected item:*/
           a = document.createElement("DIV");
           a.setAttribute("class", "select-selected");
           a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
           x[i].appendChild(a);
           /*for each element, create a new DIV that will contain the option list:*/
           b = document.createElement("DIV");
           b.setAttribute("class", "select-items select-hide");
           for (j = 0; j < selElmnt.length; j++) {
               /*for each option in the original select element,
               create a new DIV that will act as an option item:*/
               c = document.createElement("DIV");
               c.innerHTML = selElmnt.options[j].innerHTML;
               c.addEventListener("click", function (e) {
                   /*when an item is clicked, update the original select box,
                   and the selected item:*/
                   var y, i, k, s, h;
                   s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                   h = this.parentNode.previousSibling;
                   for (i = 0; i < s.length; i++) {
                       if (s.options[i].innerHTML == this.innerHTML) {
                           s.selectedIndex = i;
                           h.innerHTML = this.innerHTML;
                           y = this.parentNode.getElementsByClassName("same-as-selected");
                           for (k = 0; k < y.length; k++) {
                               y[k].removeAttribute("class");
                           }

                           this.setAttribute("class", "same-as-selected");
                        //    next.nextpage(this);
                           break;
                       }
                   }
                   h.click();
               });
               b.appendChild(c);
           }
           x[i].appendChild(b);
           a.addEventListener("click", function (e) {
               /*when the select box is clicked, close any other select boxes,
               and open/close the current select box:*/
               e.stopPropagation();
               closeAllSelect(this);
               this.nextSibling.classList.toggle("select-hide");
               this.classList.toggle("select-arrow-active");
           });
       }

    $('.owl-carousel-slider').owlCarousel({
        loop: true,
        center: true,
        smartSpeed: 1000,
        autoplaySpeed: 1000,
        autoplayHoverPause: true,
        items: 1,
        dots: true,
    })

       /* Подключение слайдера */
       // slider end
       var schet = 0;
       $('#businessaccordeon input[type="checkbox"]').change(function () {
           if ($(this).is(':checked')) {
               schet++;
               if (schet > 0) {
                   $('#yourchoice').slideDown(300);
               }
           } else {
               schet--;
               if (schet == 0) {
                   $('#yourchoice').slideUp()
               }
           }
       })



       //модальное окно для слайдера

















       // вопросы и ответы 
       $('.select-items div').click(function () {
           if (this.innerHTML.trim() == "Что такое ТелеМед?") {
               $('.b2c_answer').text("Это сервис для удаленных консультаций с самыми разными врачами. Он позволяет в любой момент, когда возникает вопрос о здоровье (вашем или ваших близких), сразу же обратиться к врачу и получить совет и четкий алгоритм действий. По телефону или через интернет, как вам удобнее. Это не заменит поход к врачу, но сделает быстрее и легче ваш путь к выздоровлению. ");
           }
           if (this.innerHTML.trim() == "То есть мне поставят диагноз?") {

               $('.b2c_answer').text("Нет, этого не разрешает закон. Поставить диагноз, назначить лечение или выписать больничный врач через интернет не сможет — для этого нужно прийти на очный приём.");
           }
           if (this.innerHTML.trim() == "Вы лечите по телефону?") {

               $('.b2c_answer').text("Нет, но мы объективно оцениваем степень опасности состояния клиента. Мы даем рекомендации в соответствии с состоянием и исчерпывающие ответы на все вопросы: собираем данные и составляем план обследования, подбираем клинику для очного визита.");
           }
           if (this.innerHTML.trim() == "А как я вспомню все, что посоветовал доктор?") {

               $('.b2c_answer').text("Все консультации сохраняются в личном кабинете. Там находятся аудиозаписи ваших устных и видео обращений и заключение доктора.");
           }
           if (this.innerHTML.trim() == "Можно ли звонить из-за границы?") {

               $('.b2c_answer').text("Звонить можно из любой точки России, телефон 8-800 для клиентов полностью бесплатен. Находясь за границей, чтобы избежать дополнительных затрат, лучше воспользоваться чатом или аудио/видео звонками через интернет в личном кабинете на сайте или чат-ботом.");
           }

           if (this.innerHTML.trim() == "А можно просто спросить?") {

               $('.b2c_answer').text("Конечно. Любые вопросы об организме, правилах гигиены, питании, занятиях спортом — словом, обо всём, что связано со здоровьем, или о том, что, как вам кажется, связано. Доктор определит, какие из ваших вопросов важны, и даст квалифицированные ответы, которые не всегда легко найти в интернете.");
           }
           if (this.innerHTML.trim() == "Что за врачи работают в сервисе, откуда они?") {

               $('.b2c_answer').text("Практикующие врачи с опытом от 9 лет, которые помимо работы в нашем сервисе обязательно ведут приемы пациентов, чтобы не терять практику. Мы долго отбирали их и обучали, чтобы оказывать самые качественные консультации. Увидеть доктора, который занимается вашим вопросом, вы сможете в личном кабинете.");
           }
           if (this.innerHTML.trim() == "У меня в сертификате 5 консультаций. Это значит, что я могу позвонить 5 раз?") {

               $('.b2c_answer').text("Каждая консультация – это полностью решенная проблема. Пока мы с вами ей занимаемся, вы можете звонить и писать нам столько, сколько потребуется. ");
           }

       })

       // end
       // b2b Q&A
       $('#form input').keyup(function(){
            let name = $('#name').val()
            let lastname = $('#lastname').val()
            let mail = $('#mail').val()
            let phone = $('#phone').val()
            let msg = $('#messagearea').val()
            console.log(name.length + ' name')
            console.log(lastname.length + ' lastname')
            console.log(mail.length + ' mail')
            console.log()
            console.log(phone.length + ' phone')

            if ((name.length) && (lastname.length) && ($(msg.length)) && (mail.length) && (phone.length) && !($('.input__email').hasClass('invalid'))){
                console.log('отправка')
                $('.send').removeAttr('disabled',)
            }
       })
       $('.thanks_you_button').click(function () {
           $('#thanks_you').hide();
           $('#form').css('opacity', '1');
           $('#form input, #form textarea').val("");
           $('input[name="agree_checkbox"]').removeAttr('checked');
       })
       $('.select-items div').click(function () {
           if (this.innerHTML.trim() == "Вы предлагаете только представленные на сайте тарифы?") {
               $('.b2b_answer').text("Мы подберем для ваших сотрудников или клиентов именно то, что подойдёт им лучше всего. У нас очень широкая продуктовая линейка для всех целевых аудиторий и предполагаемых затрат. ");
           }





           if (this.innerHTML.trim() == "У нашей компании уже есть ДМС для сотрудников, зачем нам ещё что-то?") {

               $('.b2b_answer').text("Даже если ваша компания не готова отказаться от добровольного медицинского страхования в традиционном виде, телемедицинская служба может быть прекрасным дополнением. Болезнь всегда легче вылечить на начальном этапе (а ещё лучше — с помощью профилактики), что и позволяет сделать наш доктор, который доступен в любой момент. Наш сервис работает в режиме 24/7, доступен по телефону из любой точки России, а через мессенджеры или web-интерфейс — из любой точки мира.");
           }




           if (this.innerHTML.trim() == "Врачи каких специальностей есть в ТелеМед?") {

               $('.b2b_answer').text("В режиме 24/7 дежурят широкие специалисты — терапевты, педиатры, врачи скорой помощи и врачи общей практики. Их задача – быстро разобраться с проблемой и её срочностью и, если нужно, передать задачу другим специалистам сервиса. Также консультации можно получить у врачей по специальностям: терапевт, невролог, врач скорой и неотложной помощи, кардиолог, геронтолог, педиатр, нейрохирург, травматолог-ортопед, хирург, сердечно-сосудистый хирург, клинический фармаколог, организатор медицины и общественного здоровья, детский онколог.");
           }





           if (this.innerHTML.trim() == "Какова квалификация и уровень компетенции врачей?") {

               $('.b2b_answer').text("Абсолютно все врачи имеют соответствующее образование и квалификацию, что мы можем подтвердить предоставлением их дипломов и сертификатов. У нас работают врачи с большим стажем (средний стаж — 17,5 лет), кроме того, некоторые врачи имеют более чем одну медицинскую специальность. Большинство из них совмещают работу в ТелеМед со своей врачебной практикой. Мы очень требовательно относимся к подбору персонала.");
           }





           if (this.innerHTML.trim() == "Хорошо, а сколько занимает запуск?") {

               $('.b2b_answer').text("Мы работаем быстро. Для стандартных бизнес-процессов (например, запуск комиссионного продукта) стандартный срок 2-3 недели от начала работы до старта продаж. Если же мы готовим уникальный продукт или сложную интеграцию специально для вас, срок может отличаться, но благодаря наличию собственных ключевых департаментов запуск даже нестандартных проектов проходит в кратчайшие сроки. ");
           }






           if (this.innerHTML.trim() == "Я не верю, что сервисом будут пользоваться и что это не зря потраченные деньги") {

               $('.b2b_answer').text("Телемедицина — это новое направление в России, поэтому сложно сказать точно, какое количество людей будет пользоваться им в долгосрочной перспективе. Однако по опыту работы с нашими корпоративными клиентами мы можем сказать, что обращаемость заметно выше, чем по контрактам ДМС. Для большей информированности мы проведём обучение ваших сотрудников, расскажем, что именно они могут получить, пользуясь сервисом ТелеМед, организуем welcome calls и другие мероприятия, направленные на повышение обращаемости к сервису.");
           }





           if (this.innerHTML.trim() == "Вы можете подключить к сервису только сотрудников компании?") {

               $('.b2b_answer').text("Мы можем подключить по желанию клиента как сотрудников компании, так и их детей, супругов или других членов семьи. Мы также можем подключить клиентов компании.");
           }







       })

       // end

       function closeAllSelect(elmnt) {
           /*a function that will close all select boxes in the document,
           except the current select box:*/
           var x, y, i, arrNo = [];
           x = document.getElementsByClassName("select-items");
           y = document.getElementsByClassName("select-selected");
           for (i = 0; i < y.length; i++) {
               if (elmnt == y[i]) {

                   arrNo.push(i)
               } else {
                   y[i].classList.remove("select-arrow-active");
               }
           }
           for (i = 0; i < x.length; i++) {
               if (arrNo.indexOf(i)) {
                   x[i].classList.add("select-hide");
               }
           }
       }
       /*if the user clicks anywhere outside the select box,
       then close all select boxes:*/
       document.addEventListener("click", closeAllSelect);
       $('.owl-carousel-slider').owlCarousel({
           loop: true,
           margin: 10,
        //    responsiveClass: true,
           nav: true,
           onDragged: function () {
               $('body').css('pointer-events', 'all');
           },
           onDrag: function () {
               $('body').css('pointer-events', 'none');
           },
           responsive: {
               0: {
                   items: 1,
                   nav: true,
                   margin: 40,

               },
               600: {
                   items: 2,
                   nav: false

               },
               1000: {
                   items: 3,
                   nav: true
               }
           }
       })
       


       $('.owl-carousel-recalls').owlCarousel({
           loop: true,
        //  autoplay: true,
       
           // responsiveClass:true,
           nav: true,
           responsive: {
               0: {
                   items: 1,
                   nav: true
              },
               720: {
                   items: 2,
                   nav: false,
                   dots: true

               },

               1010: {
                   items: 3,
                   nav: true,
                   loop: true,
                   dotsEach: true
               }
           }
       })

       $('.owl-carousel-news').owlCarousel({

            loop: true,
            autoplay: true,
            nav: true,
            items: 4,
            margin: 15,
            responsive: {
                0: {
                    items: 1,
                //    nav: true
                },
                720: {
                    items: 2,
                //    nav: false,
                    dots: true

                },

                1010: {
                    items: 3,
                    nav: true,
                    loop: true,
                    margin: 20
                },
                1300: {
                    items: 4
                }
            }
           })




       $('.owl-carousel-doctors').owlCarousel({
           dotsEach: true,
           nav: true,
           dots: true,
           margin: 30,
           responsive: {
               0: {
                   items: 1,
                   nav: true
               },
               720: {
                   items: 1,
                   nav: true
               }
           }
           
       })
       // $('#callme').click(function(){
       //     $('#callmodal').show();
       //     $('#callmodal').addClass('opened');
       // })
       // $('#callmodal span').click(function(){
       //     $('#callmodal').hide();
       //         $('#callmodal').removeClass('opened');
       // })

       // $(document).click(function(){
       //     if ($('#callmodal').hasClass('opened')) {
       //     $('#callmodal').hide();}
       // })

       //    $('.colleft .workblock p').mouseover(function(){
       //     $(this).addClass('activep')
       // })
       $('.colleft .workblock p').mouseleave(function () {
           $(this).removeClass('activep')
       })


       $('.colright p:nth-child(1)').mouseover(function () {

           $('.colleft p:nth-child(1)').addClass('activep')
       })
       $('.colright p:nth-child(2)').mouseover(function () {

           $('.colleft p:nth-child(2)').addClass('activep')
       })
       $('.colright p:nth-child(3)').mouseover(function () {

           $('.colleft p:nth-child(3)').addClass('activep')
       })
       $('.colright p:nth-child(4)').mouseover(function () {

           $('.colleft p:nth-child(4)').addClass('activep')
       })
       $('.colright p:nth-child(5)').mouseover(function () {

           $('.colleft p:nth-child(5)').addClass('activep')
       })

       $('.colright p:nth-child(1)').mouseleave(function () {

           $('.colleft p:nth-child(1)').removeClass('activep')
       })
       $('.colright p:nth-child(2)').mouseleave(function () {

           $('.colleft p:nth-child(2)').removeClass('activep')
       })
       $('.colright p:nth-child(3)').mouseleave(function () {

           $('.colleft p:nth-child(3)').removeClass('activep')
       })
       $('.colright p:nth-child(4)').mouseleave(function () {

           $('.colleft p:nth-child(4)').removeClass('activep')
       })
       $('.colright p:nth-child(5)').mouseleave(function () {

           $('.colleft p:nth-child(5)').removeClass('activep')
       })


       $('#aboutelmed .forme').click(function () {
           // $(this).addClass('activetab');
           b2c();
           // $('#aboutelmed .forbusiness').removeClass('activetab');
           // $('.windowme').show();
           //   $('#haveaquestion h1').text('Остались вопросы?')
           // $('#aboutulfirst').show();
           //       $('.windowb2b').hide();
           // $('#aboutulsecond').hide();
       })
       $('#aboutelmed .forbusiness').click(function () {
           b2b();
           // $(this).addClass('activetab');
           // $('#haveaquestion h1').text('Получите коммерческое предложение')
           // $('#aboutelmed .forme').removeClass('activetab');
           //     $('.windowb2b').show();
           // $('#aboutulsecond').show();
           //     $('.windowme').hide();
           // $('#aboutulfirst').hide();
       })
       $('#tariffs .forbusiness').click(function () {
           b2b();
           // $(this).addClass('activetab');
           // $('#tariffs .forme').removeClass('activetab');
           // $('#forbusinesstariffs').show();
           // $('#formetariffs').hide();

       })
       $('#tariffs .forme').click(function () {
           b2c();
           // $(this).addClass('activetab');
           // $('#tariffs .forbusiness').removeClass('activetab');
           // $('#forbusinesstariffs').hide();
           // $('#formetariffs').show();
       })
       $('#questions .forbusiness').click(function () {
           b2b();
           // $(this).addClass('activetab');
           //   $('#questions .forme').removeClass('activetab');
           //   $('.businessquestion').show();
           //   $('.mequestion').hide();
       })
       $('#whenyoucallme .forbusiness').click(function () {
           b2b();
           // $(this).addClass('activetab');
           //   $('#questions .forme').removeClass('activetab');
           //   $('.businessquestion').show();
           //   $('.mequestion').hide();
       })
       $('#howitwork .forbusiness').click(function () {
           b2b();
           // $(this).addClass('activetab');
           //   $('#questions .forme').removeClass('activetab');
           //   $('.businessquestion').show();
           //   $('.mequestion').hide();
       })
       $('#questions .forme').click(function () {
           b2c();
           // $(this).addClass('activetab');
           //   $('#questions .forbusiness').removeClass('activetab');
           //   $('.businessquestion').hide();
           //   $('.mequestion').show();
       })
       $('#howitwork .forme').click(function () {
           b2c();
           // $(this).addClass('activetab');
           //   $('#questions .forbusiness').removeClass('activetab');
           //   $('.businessquestion').hide();
           //   $('.mequestion').show();
       })
       $('#whenyoucallme .forme').click(function () {
           b2c();
           // $(this).addClass('activetab');
           //   $('#questions .forbusiness').removeClass('activetab');
           //   $('.businessquestion').hide();
           //   $('.mequestion').show();
       })
       var acc = document.getElementsByClassName("accordion");
       var i;

       for (i = 0; i < acc.length; i++) {
           acc[i].addEventListener("click", function () {
               this.classList.toggle("active");
               var panel = this.nextElementSibling;
               if (panel.style.display === "block") {
                   panel.style.display = "none";
               } else {
                   panel.style.display = "block";
               }
           });
       }
       $('#haveaquestion .swaphref').attr('href', '#callback')
       $('#languange').click(function () {
           $('.languanges').toggle(100);

       })
       $('.art').mouseover(function () {
           $(this).find(".arth").css('color', '#b47eb9').css('transition', '.3s');
       })
       $('.art').mouseleave(function () {
           $('.arth').css('color', '#505050').css('transition', '.3s');
       })

       $('.steps .col').mouseover(function () {
           $(this).find("p").css('color', '#b47eb9').css('transition', '.3s');
       })
       $('.steps .col').mouseleave(function () {
           $(this).find("p").css('color', '#505050').css('transition', '.3s');
       })



       $('#callback .forme').click(function () {

           b2c();

       })
       $('#callback .forbusiness').click(function () {

           b2b();

       })
       $('#callme, #callmodal span').click(function () {
           $('#callmodal').toggle();
           $('#callme').css('opacity', '0')
       })
       $('#callmodal span').click(() => {
           $('#callme').css('opacity', '1')
       })
       $(document).mouseup(function (e) {
           var container = $(".languanges");
           if (container.has(e.target).length === 0) {
               container.hide(100);
           }
           $('#callme').css('opacity', '1')
       });
       $(document).mouseup(function (e) {
           var container = $("#callmodal");
           if (container.has(e.target).length === 0) {
               container.hide(100);
           }
           $('#callme').css('opacity', '1')
       });


       /* эффект на картах врачей в слайдере */
       $('.slider__item').mouseover(function () {
           $(this).find("#doctor_info").css('transition', '.3s').css('display', 'block');
           $(this).find(".card-body").css("background", "rgba(0,0,0,.67)");
       })
       $('.slider__item').mouseleave(function () {
           $(this).find("#doctor_info").css('transition', '.3s').css('display', 'none');
           $(this).find(".card-body").css("background", "rgba(0,0,0,.33)");
       })


       $('#anotherlogos').hide();
       $('#anotherlogos2').hide();









       $('#somethingelse').click(function () {
           $(this).hide();
           $('#anotherlogos').slideDown(300);
           $('#hidepartners').fadeIn(800);
       })




       $('#somethingelse2').click(function () {
           $(this).hide();
           $('#anotherlogos2').slideDown(300);
           $('#hidepartners2').fadeIn(800);
       })




       $('#hidepartners').click(function () {
           $(this).hide();
           $('#somethingelse').fadeIn(800);
           $('#anotherlogos').slideUp(300);
       })




       $('#hidepartners2').click(function () {
           $(this).hide();
           $('#somethingelse2').fadeIn(800);
           $('#anotherlogos2').slideUp(300);
       })






       $('.standart-item div').click(function () {
           $('#tarrifmodal #ui-id-1').click();


       })
       $('.plus-item div').click(function () {
           $('#tarrifmodal #ui-id-1').click();

       })
       $('.family-health-item div').click(function () {
           $('#tarrifmodal #ui-id-2').click();

       })
       $('.second-opinion-item div').click(function () {
           $('#tarrifmodal #ui-id-3').click();

       })




       $('.delete').click(function () {
           $('#tarifoptions').hide();
           $('.itogo').text('');
           $('.send').attr('disabled', 'disabled');
           $('#sale_id').val(' ');
           $('input[name="rate_cost"]').val("");
           $('#bucketform input').val(" ");

       })


       // $('.nav-link').click(function(){
       //  $('.block__about').show();
       // })




       const getNews = async () => {
        let res = await fetch('https://api.tildacdn.info/v1/getpageslist/?publickey=yk73h1c7j53b7x87qvfe&secretkey=4dsatm85ct2bd9evar2u&projectid=861576');
        return res.json()
    }
    
    getNews().then((news) => {
            if(news.status == 'FOUND') {
    
                let news_list = news.result.slice(-3);
                news_list.forEach((nn, ind) => {
                  if ((nn.sort >= 1000) && (nn.sort < 2000)){
                    let block = $('#newblog').find('div').eq(ind);
                    block.find('a').text(nn.title);
                    block.find('.spandate').text(nn.date.split(' ')[0]);
                     block.find('a').attr('href', `http://blog.telmed24.ru/${nn.filename}`)
               }
                }) 
            }
    
    
        })
    })