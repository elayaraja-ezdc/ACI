export class Filter {
  destination_from_port: string;
  destination_to_port: string;
  either_type: string;
  protocol: string;

  constructor(destination_from_port: string, destination_to_port: string, either_type: string, protocol: string) {
    this.destination_from_port = destination_from_port;
    this.destination_to_port = destination_to_port;
    this.either_type = either_type;
    this.protocol = protocol;
  }
}
