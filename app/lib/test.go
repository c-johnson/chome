package generator

import (
	"bytes"
	"encoding/json"
	"fmt"
)

var _ = fmt.Println
var _ = bytes.Compare
var _ = json.Compact

func main() {
	Generate(true)
}
