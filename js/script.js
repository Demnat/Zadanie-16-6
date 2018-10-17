$(function() {

    var url = 'https://restcountries.eu/rest/v2/name/';
    var countriesList = $('#countries');
    


    function headerCountry(country) {
        
        var self = this; // dla zagnieżdżonych funkcji
    
        this.name = country.name;
        this.flagSrc = country.flag;
        this.$element = createHeaderCountry();

        function createHeaderCountry() {
           
            var $header = $('<div>').addClass('row');
            var $flagColumn = $('<div>').addClass('col-lg-4');
            var $nameColumn = $('<div>').addClass('col-lg-8');
            var $flag = $('<img>').addClass('index__main-ul-item-dataContainer-flag')
                                  .attr('src', self.flagSrc);
            var $name = $('<h3>').addClass('index__main-ul-item-dataContainer-name')
                                .text(self.name);
            console.log(self.flagSrc);
            
            $header.append($flagColumn)
                  .append($nameColumn);
            $flag.appendTo($flagColumn);
            $name.appendTo($nameColumn);

            return $header;

        }

    };

    function detailsCountry(country) {
        
        var self = this; // dla zagnieżdżonych funkcji
        
        this.capital = country.capital;
        this.landArea = country.area;
        this.population = country.population;
        this.languages = country.languages; //tablica obiektów
        this.currency = country.currencies;  //tablica obiektów
        this.$element = createDetailsCountry();


        function createDetailsCountry() {
            
            var $details = $('<div>').addClass('row');
            var $infoHeader = $('<h4>').addClass('index__main-ul-item-dataContainer-infoHeader')
                                      .text('Background information:');
            var $info = $('<div>').addClass('index__main-ul-item-dataContainer-info container-fluid');
            var $row = $('<div>').addClass('row');
            var $headersInfoColumn = $('<div>').addClass('col-lg-4');
            var $dataColumn = $('<div>').addClass('col-lg-8');
            var $capitalH = $('<p>').addClass('index__main-ul-item-dataContainer-info-header')
                                    .text('Capital');
            var $landAreaH = $('<p>').addClass('index__main-ul-item-dataContainer-info-header')
                                     .text('Land area (km2)'); 
            var $populationH = $('<p>').addClass('index__main-ul-item-dataContainer-info-header')
                                       .text('Population');                       
            var $languagesH = $('<p>').addClass('index__main-ul-item-dataContainer-info-header')
                                      .text('Language(s)');                       
            var $currencyH = $('<p>').addClass('index__main-ul-item-dataContainer-info-header')
                                     .text('Currency');
            
            var $capital = $('<p>').addClass('index__main-ul-item-dataContainer-info-data')
                                     .text(': ' + self.capital);
            var $landArea = $('<p>').addClass('index__main-ul-item-dataContainer-info-data')
                                      .text(': ' + self.landArea); 
            var $population = $('<p>').addClass('index__main-ul-item-dataContainer-info-data')
                                        .text(': ' + self.population);  
            var languagesList = '';
            self.languages.forEach(function(lang) {
                languagesList += ' ' + lang.name;    
            });                                              
            var $languages = $('<p>').addClass('index__main-ul-item-dataContainer-info-data')
                                       .text(': ' + languagesList);  
            var currenciesList = '';
            console.log(self.currency);
            self.currency.forEach(function(curr) {
                currenciesList += ' ' + curr.name;    
            });                     
            var $currency = $('<p>').addClass('index__main-ul-item-dataContainer-info-data')
                                      .text(': ' + currenciesList);

            
            $details.append($infoHeader)
                    .append($info);  
            $info.append($row);                        
            $row.append($headersInfoColumn)
                 .append($dataColumn);
            $headersInfoColumn.append($capitalH)
                              .append($landAreaH)
                              .append($populationH)
                              .append($languagesH)
                              .append($currencyH);
            $dataColumn.append($capital)
                       .append($landArea)
                       .append($population)
                       .append($languages)
                       .append($currency);
            
            return $details;

        }

    };

    function showCountriesList(resp) {
        countriesList.empty();
        resp.forEach(function(item) {
            var $country = $('<li>').addClass('index__main-ul-item');
            $country.appendTo(countriesList);
            var $dataContainer = $('<div>').addClass('index__main-ul-item-dataContainer container-fluid');
            $dataContainer.appendTo($country);

            var $headerCountry = new headerCountry(item);
            var $detailsCountry = new detailsCountry(item);
            $headerCountry.$element.appendTo($dataContainer);
            $detailsCountry.$element.appendTo($dataContainer);

        });
    }

    function searchCountries(e) {
        e.preventDefault();
        console.log('hello');
        var countryName = $('#country-name').val();
        if(!countryName.length) countryName = 'Poland';
        console.log(countryName);
        $.ajax({
            url: url + countryName,
            method: 'GET',
            success: showCountriesList
        });
    }

    $('#search').click(searchCountries);


})