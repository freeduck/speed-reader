// Speed reader -- Use rapid serial visual presentation (RSVP) and optimal recognition point to read texts faster.
// Copyright (C) 2013  Kristian Nygaard Jensen

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

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
        },
        getWords: function(text){
            return text.split(/\s+/);
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
