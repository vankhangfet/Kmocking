
function Mock()
{   
    return {
        
        mole: function(obj)
        {   
            this.mole = obj;
            this.exec = [];
            return this;
        },

        setup: function(funcCall)
        {  
           let param = funcCall.toString();
           let tempData = param.split(".")[1];
           let targetFunc = tempData.split("(")[0];
           this.exec[targetFunc] = 0;
           this.targetFunc = targetFunc; 
           return this;
        },
        returns: function(value)
        {    
            //console.log("Invoke");
            //console.log("expected mocking:" + value)
            this.mole.mockval = this;
            this.mole[this.targetFunc] = function() {
                console.log(this.mockval);
                this.mockval.exec[this.mockval.targetFunc]++;
                return value;
            }
            return this.mole[this.targetFunc]();
        },
        verify: function(func,times)
        {   
            // Need to check func again?
            //console.log(times.checkingType);
            //console.log(times.times);
            let currentInvoke = this.exec[this.targetFunc] -1;
            //console.log(this.exec[this.targetFunc]);
            if(times.checkingType == InvokeType.exactly)
               return currentInvoke == times.times?true:false;
            if(times.checkingType == InvokeType.atLeast)
               return currentInvoke >= times.times?true:false;
        },
        throws: function(errorMessage)
        {   this.errorMessage = errorMessage;
            return this.errorMessage;
        }

    }
}

let InvokeType = {
    exactly: 'exactly',
    atLeast: 'atLeast'
}

function Times()
{   
    return {
      
        exact: function(times){
            return {
                     times: times,
                     checkingType: InvokeType.exactly
                   }
        },
        atLeast: function(times)
        {
            return {
                times:times,
                checkingType: InvokeType.atLeast
            };
        }

    };
}

module.exports = {
    Mock:Mock,
    Times: new Times()
}