export function processNode(data: any) {
    if (data) {
      return {
        title: data["title"],
        start_node: data["start_node"],
        nodes: data["nodes"]
      };
    } else {
      return {
        title: "",
        start_node: "start",
        nodes: {
          "start": {
            "text": "Sample",
            "choices": []
          }
        }
      };
    }
} 