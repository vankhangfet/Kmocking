
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
           //console.log(targetFunc);
           this.targetFunc = targetFunc; 
           //this.funcCall = funcCall;
           //console.log(this);
           return this;
        },
        returns: function(value)
        {    
            //console.log("Invoke");
            //console.log("expected mocking:" + value)
            let proxied = this.mole[this.targetFunc]; 
            //console.log(proxied);
            this.mole[this.targetFunc] = function() {
                return value;
            }
            this.exec[this.targetFunc]++;
            // Number of invoke target function.
            //console.log(this.exec[this.targetFunc]++);
            return this.mole[this.targetFunc]();
        },
        verify: function(func,times)
        {   
            // Need to check func again?
            
            return this.exec[this.targetFunc] == times?true:false;
        },
        throws: function()
        {
            return this;
        }

    }
}

function Times()
{   
    return {
      
        exact: function(times){
            return times;
        },
        atLeast: function(times)
        {
            return times;
        }

    };
}

module.exports = {
    Mock:Mock,
    Times: new Times()
}