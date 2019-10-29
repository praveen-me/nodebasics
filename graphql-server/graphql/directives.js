import dateformat from "dateformat";
import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver, GraphQLString } from "graphql";

export class FormattableDateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { defaultFormat } = this.args;

    field.args.push({
      name: "format",
      type: GraphQLString
    });

    field.resolve = async (source, { format, otherArgs }, ...args) => {
      const value = await resolve.call(this, source, otherArgs, ...args);
      return dateformat(value, format || defaultFormat);
    };
  }
}
