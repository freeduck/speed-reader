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
    var services = {};
    function Service(name){
        var args = Array.prototype.slice.call(arguments, 1);
        if(args.length > 0){
            services[name] = args[0];
            return true;
        }
        if(typeof services[name] === 'undefined'){
            console.log(services);
            throw 'No service named: ' + name;
        }
        return services[name];
    }

    namespace.service = Service;
})(speedreader, jQuery);



