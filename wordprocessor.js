var speedreader = speedreader||{};
(function(namespace, $){
    function WordProcessor(){
        
    }

    WordProcessor.prototype = {
        getOptimalRecognitionPoint: function(word){
            return Math.floor(word.length/2) - 1;
        },
        getSpacePadding: function (word, length){
            return this.fillString("\u00A0", length - this.getOptimalRecognitionPoint(word) + 1);
        },
        fillString: function(ch, length){
            return new Array(length).join(ch);
        }
    };

    namespace.createWordProcessor = function(){
        return new WordProcessor();
    };

    namespace.service('wordProcessor', namespace.createWordProcessor());

    function WordDecorator(wordProcessor){
        this.wordProcessor = wordProcessor;
    }

    WordDecorator.prototype = {
        highlightWord: function(word){
            var splitPos = Math.floor(word.length/2) - 1;
            var firstPart = word.substring(0,splitPos);
            var endPart = word.substring(splitPos + 1);
            var output = firstPart
                + '<span class="highlighted">'
                + word.charAt(splitPos)
                + '</span>'
                + endPart;
            return output;
        }
    };

    

    namespace.createWordDecorator = function(){
        return new WordDecorator(namespace.service('wordProcessor'));
    };

    namespace.service('wordDecorator', namespace.createWordDecorator())


    namespace.highlightWord = function(word){
        var splitPos = Math.floor(word.length/2) - 1;
        var firstPart = word.substring(0,splitPos);
        var endPart = word.substring(splitPos + 1);
        var output = firstPart
        + '<span class="highlighted">'
        + word.charAt(splitPos)
        + '</span>'
        + endPart;
        return output;
    }
})(speedreader, jQuery);

console.log('Wordprocessor');
console.log(speedreader.highlightWord('hello'));
